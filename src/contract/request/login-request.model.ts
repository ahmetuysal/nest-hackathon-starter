import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class LoginRequest {
  @ApiProperty()
  @IsNotEmpty()
    // username or email
  identifier: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
