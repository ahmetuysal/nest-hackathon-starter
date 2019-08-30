import { ApiModelProperty } from '@nestjs/swagger';

export class SignupRequest {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  username: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  firstName: string;
  @ApiModelProperty()
  lastName: string;
  @ApiModelProperty()
  middleName?: string;
}
