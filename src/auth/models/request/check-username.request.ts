import { IsNotEmpty, MaxLength } from 'class-validator';

export class CheckUsernameRequest {
  @IsNotEmpty()
  @MaxLength(20)
  username: string;
}
