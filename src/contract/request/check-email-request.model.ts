import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CheckEmailRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
