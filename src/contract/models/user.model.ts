import {
  IsOptional,
  IsNumber,
  IsNotEmpty,
  Matches,
  MaxLength,
  IsEmail,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiModelProperty()
  @IsNumber()
  id?: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(20)
  username?: string;

  @ApiModelProperty()
  @IsEmail()
  email?: string;

  @ApiModelProperty()
  @IsBoolean()
  emailVerified?: boolean;

  @ApiModelProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ]+$'))
  @MaxLength(20)
  firstName?: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  @MaxLength(40)
  lastName?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(40)
  @Matches(RegExp('^[A-Za-zıöüçğşİÖÜÇĞŞñÑáéíóúÁÉÍÓÚ ]+$'))
  middleName?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  birthDate?: Date;

  @ApiModelPropertyOptional()
  @IsOptional()
  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  registrationDate?: Date;
}
