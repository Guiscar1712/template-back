import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn('uuid', {
    name: 'email_id',
  })
  email_id: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @ManyToOne(() => User, (user) => user.emails, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
