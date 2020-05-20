import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MinLength } from 'class-validator';

export class ResetPasswordRequest {
  @ApiProperty()
  @IsNotEmpty()
  @Length(21)
  token: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
