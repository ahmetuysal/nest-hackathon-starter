import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  // username or email
  identifier: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
