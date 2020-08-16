import {
  Column, Entity, Index, PrimaryColumn, Unique,
} from 'typeorm';

@Entity('email-change')
@Unique('unique_email-change_userId', ['userId'])
@Index('index_email-change_userId', ['userId'])
export class EmailChange {
  @PrimaryColumn('character', { length: 21 })
  token: string;

  @Column('text')
  newEmail: string;

  @Column('integer')
  userId: number;

  @Column('timestamp')
  validUntil: Date;
}
