import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class ChangeEmailRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  newEmail: string;
}
