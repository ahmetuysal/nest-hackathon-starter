import {
  Column, Entity, Index, PrimaryColumn,
} from 'typeorm';

@Entity('email-change')
@Index('index_email-change_userId', ['userId'], { unique: true })
export class EmailChange {
  @PrimaryColumn('character', { length: 21 })
  token: string;

  @Column('text')
  newEmail: string;

  @Column('integer')
  userId: number;

  @Column('timestamp', { default: () => 'timezone(\'utc\', now()) + interval \'2 days\'' })
  validUntil: string; // ISO Date
}
