import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
