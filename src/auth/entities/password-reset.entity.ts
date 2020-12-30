import {
  Column, Entity, Index, PrimaryColumn,
} from 'typeorm';

@Entity('password-reset')
@Index('index_password-reset_userId', ['userId'], { unique: true })
export class PasswordReset {
  @PrimaryColumn('character', { length: 21 })
  token: string;

  @Column('integer')
  userId: number;

  @Column('timestamp', { default: () => 'timezone(\'utc\', now()) + interval \'2 days\'' })
  validUntil: string; // ISO Date
}
