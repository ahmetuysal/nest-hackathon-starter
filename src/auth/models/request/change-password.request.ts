import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordRequest {
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
