import { User } from '..';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserRequest {
  @ApiModelProperty()
  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
