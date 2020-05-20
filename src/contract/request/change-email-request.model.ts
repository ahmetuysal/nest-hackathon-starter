import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeEmailRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
