import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty()
  // username or email
  identifier: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
