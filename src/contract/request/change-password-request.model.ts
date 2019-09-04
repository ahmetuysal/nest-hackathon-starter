import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
