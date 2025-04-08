import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid', {
    name: 'address_id',
  })
  address_id: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  street: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  state: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  country: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  postal_code: string;

  @ManyToOne(() => User, (user) => user.addresses, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  @IsOptional() // permite que o campo seja ignorado na validação se estiver nulo
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
