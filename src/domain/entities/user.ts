import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address';
import { Email } from './emails';
import { Phone } from './phones';
import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsArray,
  IsBoolean,
} from 'class-validator';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
  })
  user_id: string;

  @Column({ type: 'varchar' })
  @IsString()
  name: string;

  @Column({ type: 'varchar' })
  @IsString()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsOptional()
  created_at: Date;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  @IsOptional()
  status: string;

  @OneToMany(() => Phone, (phone) => phone.user, { onDelete: 'CASCADE' })
  @Type(() => Phone)
  @IsArray()
  @ValidateNested({ each: true })
  phones: Phone[];

  @OneToMany(() => Address, (address) => address.user, { onDelete: 'CASCADE' })
  @Type(() => Address)
  @IsArray()
  @ValidateNested({ each: true })
  addresses: Address[];

  @OneToMany(() => Email, (email) => email.user, { onDelete: 'CASCADE' })
  @Type(() => Email)
  @IsArray()
  @ValidateNested({ each: true })
  emails: Email[];

  @IsBoolean()
  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  // @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  // @IsArray()
  // @ValidateNested({ each: true })
  // roles: UserRole[];
}
