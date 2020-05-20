import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export class SignupRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  // alphanumeric characters and - are valid
  // you can change this as you like
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(20)
  middleName?: string;
}
