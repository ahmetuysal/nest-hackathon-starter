import {
  Column, Entity, Index, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
@Index('index_user_username', ['username'], { unique: true })
@Index('index_user_email', ['email'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  passwordHash: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text', { nullable: true })
  middleName: string | null;

  @Column('text', { nullable: true })
  image: string | null;

  @Column('boolean', { default: false })
  emailVerified: boolean;

  @Column('date', { nullable: true })
  birthDate: string | null; // ISO Date

  @Column('timestamp', { default: () => 'timezone(\'UTC\', now())' })
  registrationDate: string; // ISO Date
}
