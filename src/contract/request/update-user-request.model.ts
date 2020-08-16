import { IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from '..';

export class UpdateUserRequest {
  @IsDefined()
  @ValidateNested()
  @Type(() => User)
  user: User;
}
