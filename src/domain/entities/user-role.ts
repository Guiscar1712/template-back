import {
  Entity,
  ManyToOne,
  PrimaryColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user';
import { Role } from './roles';

@Entity('users_roles')
export class UserRole {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_role_id',
  })
  user_role_id: string;

  @PrimaryColumn({ type: 'uuid' })
  user_id: string;

  @PrimaryColumn({ type: 'uuid' })
  role_id: string;

  @ManyToOne(() => User, (user) => user.roles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
