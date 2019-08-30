import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { SignupRequest } from '../contract';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() signupRequest: SignupRequest): Promise<void> {
    await this.authService.signup(signupRequest);
  }
}
