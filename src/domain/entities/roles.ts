import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid', {
    name: 'role_id',
  })
  role_id: string;

  @Column({ type: 'varchar' })
  @IsNotEmpty()
  @IsString()
  role_name: string;

  @Column({ type: 'varchar' })
  description: string;

  // @OneToMany(() => UserRole, (userRole) => userRole.role)
  // userRoles: UserRole[];
}
