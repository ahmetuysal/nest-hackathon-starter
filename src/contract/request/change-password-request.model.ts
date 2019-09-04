import { ApiModelProperty } from '@nestjs/swagger';

export class ChangePasswordRequest {
  @ApiModelProperty()
  newPassword: string;
}
