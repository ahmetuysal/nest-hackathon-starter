import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  UseGuards,
  Param,
  HttpStatus,
} from '@nestjs/common';
import {
  SignupRequest,
  LoginRequest,
  LoginResponse,
  GetUserResponse,
  ChangeEmailRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  CheckUsernameRequest,
  CheckUsernameResponse,
  CheckEmailRequest,
  CheckEmailResponse,
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

  @Post('check-username')
  @HttpCode(200)
  async checkUsernameAvailability(
    @Body() checkUsernameRequest: CheckUsernameRequest,
  ): Promise<CheckUsernameResponse> {
    return await this.authService.checkUsername(checkUsernameRequest);
  }

  @Post('check-email')
  @HttpCode(200)
  async checkEmailAvailability(
    @Body() checkEmailRequest: CheckEmailRequest,
  ): Promise<CheckEmailResponse> {
    return await this.authService.checkEmail(checkEmailRequest);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() signupRequest: SignupRequest): Promise<void> {
    await this.authService.signup(signupRequest);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequest: LoginRequest): Promise<LoginResponse> {
    return new LoginResponse(await this.authService.login(loginRequest));
  }

  @ApiBearerAuth()
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async getUserWithToken(@Usr() user: User): Promise<GetUserResponse> {
    return new GetUserResponse(toUserModel(user));
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyMail(@Param('token') token: string): Promise<void> {
    await this.authService.verifyEmail(token);
  }

  @ApiBearerAuth()
  @Post('change-email')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.OK)
  async changeEmail(@Param('token') token: string): Promise<void> {
    await this.authService.changeEmail(token);
  }

  @Post('forgot-password/:email')
  @HttpCode(HttpStatus.OK)
  async sendResetPassword(@Param('email') email: string): Promise<void> {
    await this.authService.sendResetPasswordMail(email);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
    @Usr() user: User,
  ): Promise<void> {
    await this.authService.changePassword(
      changePasswordRequest,
      user.id,
      user.firstName,
      user.email,
    );
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Body() resetPasswordRequest: ResetPasswordRequest,
  ): Promise<void> {
    await this.authService.resetPassword(resetPasswordRequest);
  }

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard())
  async resendVerificationMail(@Usr() user: User): Promise<void> {
    await this.authService.resendVerificationMail(
      user.firstName,
      user.email,
      user.id,
    );
  }
}
