import { ApiModelProperty } from '@nestjs/swagger';

export class ChangeEmailRequest {
  @ApiModelProperty()
  newEmail: string;
}
