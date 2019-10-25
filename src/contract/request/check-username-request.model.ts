import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CheckUsernameRequest {
  @ApiModelProperty()
  @IsNotEmpty()
  @MaxLength(20)
  username: string;
}
