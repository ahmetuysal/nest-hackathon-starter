import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CheckEmailRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
