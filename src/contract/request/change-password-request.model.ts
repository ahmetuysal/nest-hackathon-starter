import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordRequest {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
