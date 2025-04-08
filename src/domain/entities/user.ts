import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Address } from './address';
import { Email } from './emails';
import { Phone } from './phones';
import { UserRole } from './user-role';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id',
  })
  user_id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @OneToMany(() => Phone, (phone) => phone.user, { onDelete: 'CASCADE' })
  phones: Phone[];

  @OneToMany(() => Address, (address) => address.user, { onDelete: 'CASCADE' })
  addresses: Address[];

  @OneToMany(() => Email, (email) => email.user, { onDelete: 'CASCADE' })
  emails: Email[];

  @OneToMany(() => UserRole, (userRole) => userRole.user, { cascade: true })
  roles: UserRole[];
}
