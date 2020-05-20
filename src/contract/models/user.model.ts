import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsUrl, Matches, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  username?: string;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ]+$'))
  @MaxLength(20)
  firstName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(40)
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(40)
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  middleName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  birthDate?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  registrationDate?: Date;
}
