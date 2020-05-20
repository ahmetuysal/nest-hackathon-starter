import { User } from '..';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserRequest {
  @ApiProperty()
  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
