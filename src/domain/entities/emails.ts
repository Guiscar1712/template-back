import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('emails')
export class Email {
  @PrimaryGeneratedColumn('uuid', {
    name: 'email_id',
  })
  email_id: string;

  @Column({ type: 'varchar', unique: true })
  @IsNotEmpty()
  @IsString()
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
