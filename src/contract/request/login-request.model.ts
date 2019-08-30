import { ApiModelProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiModelProperty()
  // username or email
  identifier: string;

  @ApiModelProperty()
  password: string;
}
