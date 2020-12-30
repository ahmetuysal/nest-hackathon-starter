import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangeEmailRequest {
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
