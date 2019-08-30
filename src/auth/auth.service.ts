import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SignupRequest } from '../contract';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from '../contract';
import { isNullOrUndefined } from 'util';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from './email-verification.entity';
import { Repository } from 'typeorm';
import { MailSenderService } from '../mail-sender/mail-sender.service';
import 'nanoid';
import nanoid = require('nanoid');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepository: Repository<EmailVerification>,
    private readonly mailSenderService: MailSenderService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    const createdUser = await this.userService.createUser(
      signupRequest,
      await bcrypt.hash(signupRequest.password, 10),
    );

    const token = nanoid();

    const emailVerification = new EmailVerification();
    emailVerification.token = token;
    emailVerification.userId = createdUser.id;
    // valid for 2 days
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    emailVerification.validUntil = twoDaysLater;

    try {
      this.emailVerificationRepository.insert(emailVerification);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }

    await this.mailSenderService.sendVerifyMailMail(
      signupRequest.firstName,
      signupRequest.email,
      token,
    );
  }

  async resendVerificationMail(
    name: string,
    email: string,
    userId: number,
  ): Promise<void> {
    const emailVerification = await this.emailVerificationRepository.findOne({
      where: { userId },
    });

    if (isNullOrUndefined(emailVerification)) {
      throw new NotFoundException();
    }

    // update validUntil to 2 days later
    const twoDaysLater = new Date();
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);
    emailVerification.validUntil = twoDaysLater;

    await this.emailVerificationRepository.update(
      emailVerification.token,
      emailVerification,
    );

    await this.mailSenderService.sendVerifyMailMail(
      name,
      email,
      emailVerification.token,
    );
  }

  async verifyMail(token: string): Promise<void> {
    const emailVerification = await this.emailVerificationRepository.findOne(
      token,
    );

    if (emailVerification && emailVerification.validUntil > new Date()) {
      const userEntity = await this.userService.getUserEntityById(
        emailVerification.userId,
      );
      userEntity.emailVerified = true;
      await this.userService.updateUser(userEntity);
      await this.emailVerificationRepository.delete(emailVerification);
    } else {
      throw new NotFoundException();
    }
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const userEntity = await this.userService.getUserEntityById(payload.id);
    if (
      userEntity.email === payload.email &&
      userEntity.username === payload.username
    ) {
      return userEntity;
    } else {
      throw new UnauthorizedException();
    }
  }

  async login(loginRequest: LoginRequest): Promise<string> {
    const userEntity = await this.userService.getUserEntityByUsernameOrEmail(
      loginRequest.identifier,
    );

    if (
      isNullOrUndefined(userEntity) ||
      !bcrypt.compareSync(loginRequest.password, userEntity.passwordHash)
    ) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      id: userEntity.id,
      email: userEntity.email,
      username: userEntity.username,
    };

    return await this.jwtService.signAsync(payload);
  }
}
