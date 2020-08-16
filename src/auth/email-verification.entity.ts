import {
  Column, Entity, Index, PrimaryColumn, Unique,
} from 'typeorm';

@Entity('email-verification')
@Unique('unique_email-verification_userId', ['userId'])
@Index('index_email-verification_userId', ['userId'])
export class EmailVerification {
  @PrimaryColumn('character', { length: 21 })
  token: string;

  @Column('integer')
  userId: number;

  @Column('timestamp')
  validUntil: Date;
}
