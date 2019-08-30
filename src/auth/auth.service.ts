import { Injectable } from '@nestjs/common';
import { SignupRequest } from '../contract';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    await this.userService.createUser(
      signupRequest,
      await bcrypt.hash(signupRequest.password, 10),
    );
  }
}
