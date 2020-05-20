import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class ResetPasswordRequest {
  @IsNotEmpty()
  @Length(21)
  token: string;

  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
