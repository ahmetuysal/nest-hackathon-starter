import {
  Column, Entity, Index, PrimaryColumn, Unique,
} from 'typeorm';

@Entity('password-reset')
@Unique('unique_password-reset_userId', ['userId'])
@Index('index_password-reset_userId', ['userId'])
export class PasswordReset {
  @PrimaryColumn('character', { length: 21 })
  token: string;

  @Column('integer')
  userId: number;

  @Column('timestamp')
  validUntil: Date;
}
