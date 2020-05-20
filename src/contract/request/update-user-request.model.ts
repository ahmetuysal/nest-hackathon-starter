import { User } from '..';
import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserRequest {
  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
