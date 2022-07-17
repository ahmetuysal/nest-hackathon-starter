import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { Prisma } from '@prisma/client';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import {
  ChangeEmailRequest,
  ChangePasswordRequest,
  LoginRequest,
  ResetPasswordRequest,
  SignupRequest,
} from './models';
import { AuthUser } from './auth-user';
import { PrismaService } from '../common/services/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailSenderService: MailSenderService,
  ) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    const emailVerificationToken = nanoid();

    try {
      await this.prisma.user.create({
        data: {
          username: signupRequest.username.toLowerCase(),
          email: signupRequest.email.toLowerCase(),
          passwordHash: await bcrypt.hash(signupRequest.password, 10),
          firstName: signupRequest.firstName,
          lastName: signupRequest.lastName,
          middleName: signupRequest.middleName,
          emailVerification: {
            create: {
              token: emailVerificationToken,
            },
          },
        },
        select: null,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // unique constraint
          throw new ConflictException();
        } else throw e;
      } else throw e;
    }

    await this.mailSenderService.sendVerifyEmailMail(
      signupRequest.firstName,
      signupRequest.email,
      emailVerificationToken,
    );
  }

  async resendVerificationMail(
    name: string,
    email: string,
    userId: number,
  ): Promise<void> {
    // delete old email verification tokens if exist
    const deletePrevEmailVerificationIfExist =
      this.prisma.emailVerification.deleteMany({
        where: { userId },
      });

    const token = nanoid();

    const createEmailVerification = this.prisma.emailVerification.create({
      data: {
        userId,
        token,
      },
      select: null,
    });

    await this.prisma.$transaction([
      deletePrevEmailVerificationIfExist,
      createEmailVerification,
    ]);

    await this.mailSenderService.sendVerifyEmailMail(name, email, token);
  }

  async verifyEmail(token: string): Promise<void> {
    const emailVerification = await this.prisma.emailVerification.findUnique({
      where: { token },
    });

    if (
      emailVerification !== null &&
      emailVerification.validUntil > new Date()
    ) {
      await this.prisma.user.update({
        where: { id: emailVerification.userId },
        data: {
          emailVerified: true,
        },
        select: null,
      });
    } else {
      Logger.log(`Verify email called with invalid email token ${token}`);
      throw new NotFoundException();
    }
  }

  async sendChangeEmailMail(
    changeEmailRequest: ChangeEmailRequest,
    userId: number,
    name: string,
    oldEmail: string,
  ): Promise<void> {
    const emailAvailable = await this.isEmailAvailable(
      changeEmailRequest.newEmail,
    );
    if (!emailAvailable) {
      Logger.log(
        `User with id ${userId} tried to change its email to already used ${changeEmailRequest.newEmail}`,
      );
      throw new ConflictException();
    }

    const deletePrevEmailChangeIfExist = this.prisma.emailChange.deleteMany({
      where: { userId },
    });

    const token = nanoid();

    const createEmailChange = this.prisma.emailChange.create({
      data: {
        userId,
        token,
        newEmail: changeEmailRequest.newEmail,
      },
      select: null,
    });

    await this.prisma.$transaction([
      deletePrevEmailChangeIfExist,
      createEmailChange,
    ]);

    await this.mailSenderService.sendChangeEmailMail(name, oldEmail, token);
  }

  async changeEmail(token: string): Promise<void> {
    const emailChange = await this.prisma.emailChange.findUnique({
      where: { token },
    });

    if (emailChange !== null && emailChange.validUntil > new Date()) {
      await this.prisma.user.update({
        where: { id: emailChange.userId },
        data: {
          email: emailChange.newEmail.toLowerCase(),
        },
        select: null,
      });
    } else {
      Logger.log(`Invalid email change token ${token} is rejected.`);
      throw new NotFoundException();
    }
  }

  async sendResetPasswordMail(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        firstName: true,
        email: true,
      },
    });

    if (user === null) {
      throw new NotFoundException();
    }

    const deletePrevPasswordResetIfExist = this.prisma.passwordReset.deleteMany(
      {
        where: { userId: user.id },
      },
    );

    const token = nanoid();

    const createPasswordReset = this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
      },
      select: null,
    });

    await this.prisma.$transaction([
      deletePrevPasswordResetIfExist,
      createPasswordReset,
    ]);

    await this.mailSenderService.sendResetPasswordMail(
      user.firstName,
      user.email,
      token,
    );
  }

  async resetPassword(
    resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    const passwordReset = await this.prisma.passwordReset.findUnique({
      where: { token: resetPasswordRequest.token },
    });

    if (passwordReset !== null && passwordReset.validUntil > new Date()) {
      await this.prisma.user.update({
        where: { id: passwordReset.userId },
        data: {
          passwordHash: await bcrypt.hash(resetPasswordRequest.newPassword, 10),
        },
        select: null,
      });
    } else {
      Logger.log(
        `Invalid reset password token ${resetPasswordRequest.token} is rejected`,
      );
      throw new NotFoundException();
    }
  }

  async changePassword(
    changePasswordRequest: ChangePasswordRequest,
    userId: number,
    name: string,
    email: string,
  ): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: await bcrypt.hash(changePasswordRequest.newPassword, 10),
      },
      select: null,
    });

    // no need to wait for information email
    this.mailSenderService.sendPasswordChangeInfoMail(name, email);
  }

  async validateUser(payload: JwtPayload): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (
      user !== null &&
      user.email === payload.email &&
      user.username === payload.username
    ) {
      return user;
    }
    throw new UnauthorizedException();
  }

  async login(loginRequest: LoginRequest): Promise<string> {
    const normalizedIdentifier = loginRequest.identifier.toLowerCase();
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: normalizedIdentifier,
          },
          {
            email: normalizedIdentifier,
          },
        ],
      },
      select: {
        id: true,
        passwordHash: true,
        email: true,
        username: true,
      },
    });

    if (
      user === null ||
      !bcrypt.compareSync(loginRequest.password, user.passwordHash)
    ) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    return this.jwtService.signAsync(payload);
  }

  async isUsernameAvailable(username: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { username: username.toLowerCase() },
      select: { username: true },
    });
    return user === null;
  }

  async isEmailAvailable(email: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: { email: true },
    });
    return user === null;
  }
}
