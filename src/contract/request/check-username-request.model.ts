import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CheckUsernameRequest {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(20)
  username: string;
}
