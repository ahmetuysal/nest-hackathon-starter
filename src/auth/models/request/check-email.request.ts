import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailRequest {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
