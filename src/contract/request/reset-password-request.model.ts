import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class ResetPasswordRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @Length(21)
  token: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
