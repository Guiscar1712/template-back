import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('phones')
export class Phone {
  @PrimaryGeneratedColumn('uuid', {
    name: 'phone_id',
  })
  phone_id: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ManyToOne(() => User, (user) => user.phones, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
