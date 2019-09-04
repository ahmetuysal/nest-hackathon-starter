import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Param,
} from '@nestjs/common';
import {
  SignupRequest,
  LoginRequest,
  LoginResponse,
  GetResponse,
  User as IUser,
  ChangeEmailRequest,
  ResetPasswordRequest,
} from '../contract';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { toUserModel } from '../user/user.mapper';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupRequest: SignupRequest): Promise<void> {
    await this.authService.signup(signupRequest);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.login(loginRequest));
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async getUserWithToken(@Usr() user: User): Promise<GetResponse<IUser>> {
    return new GetResponse<IUser>(toUserModel(user));
  }

  @Get('verify')
  async verifyMail(@Param('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }

  @ApiBearerAuth()
  @Post('change-email')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async sendChangeEmailMail(
    @Usr() user: User,
    @Body() changeEmailRequest: ChangeEmailRequest,
  ): Promise<void> {
    await this.authService.sendChangeEmailMail(
      changeEmailRequest,
      user.id,
      user.firstName,
      user.email,
    );
  }

  @Get('change-email')
  async changeEmail(@Param('token') token: string): Promise<void> {
    await this.authService.changeEmail(token);
  }

  @Post('forgot-password/:email')
  @HttpCode(200)
  async sendResetPassword(@Param('email') email: string): Promise<void> {
    await this.authService.sendResetPasswordMail(email);
  }

  @Post('reset-password')
  @HttpCode(200)
  async resetPassword(
    @Body() resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordRequest);
  }

  @Post('resend-verification')
  @HttpCode(200)
  @UseGuards(AuthGuard())
  async resendVerificationMail(@Usr() user: User): Promise<void> {
    await this.authService.resendVerificationMail(
      user.firstName,
      user.email,
      user.id,
    );
  }
}
