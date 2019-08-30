import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupRequest } from '../contract';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginRequest } from '../contract';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupRequest: SignupRequest): Promise<void> {
    await this.userService.createUser(
      signupRequest,
      await bcrypt.hash(signupRequest.password, 10),
    );
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
