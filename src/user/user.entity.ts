import {
  Column, Entity, Index, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import {
  IsBoolean, IsEmail, IsLowercase, IsNotEmpty, IsOptional, IsUrl, Matches, MaxLength,
} from 'class-validator';
import { User as IUser } from '../contract';

@Entity('user')
@Unique('unique_user_username', ['username'])
@Unique('unique_user_email', ['email'])
@Index('index_user_username', ['username'])
@Index('index_user_email', ['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Matches(RegExp('^[a-zA-Z0-9\\-]+$'))
  @MaxLength(32)
  @IsLowercase()
  @Column('text')
  username: string;

  @IsEmail()
  @Column('text')
  email: string;

  @IsNotEmpty()
  @Column('text')
  passwordHash: string;

  @IsNotEmpty()
  @MaxLength(20)
  @Column('text')
  firstName: string;

  @IsNotEmpty()
  @MaxLength(40)
  @Column('text')
  lastName: string;

  @IsOptional()
  @MaxLength(40)
  @Column('text', { nullable: true })
  middleName?: string;

  @IsOptional()
  @IsUrl()
  @Column('text', { nullable: true })
  image?: string;

  @IsBoolean()
  @Column('boolean', { default: false })
  emailVerified: boolean;

  @IsOptional()
  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  @Column('date', { nullable: true })
  birthDate?: Date;

  @Matches(RegExp('([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))'))
  @Column('date')
  registrationDate: Date;
}
