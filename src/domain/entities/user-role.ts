// import {
//   Entity,
//   ManyToOne,
//   PrimaryColumn,
//   JoinColumn,
//   PrimaryGeneratedColumn,
// } from 'typeorm';
// import { User } from './user';
// import { Role } from './roles';
// import { IsNotEmpty, IsString } from 'class-validator';

// @Entity('users_roles')
// export class UserRole {
//   @PrimaryGeneratedColumn('uuid', {
//     name: 'user_role_id',
//   })
//   @IsNotEmpty()
//   @IsString()
//   user_role_id: string;

//   // @PrimaryColumn({ type: 'uuid' })
//   // @IsNotEmpty()
//   // @IsString()
//   // user_id: string;

//   @PrimaryColumn({ type: 'uuid' })
//   role_id: string;

//   @ManyToOne(() => User, (user) => user.roles, {
//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'user_id' })
//   user: User;

//     onDelete: 'CASCADE',
//   })
//   @JoinColumn({ name: 'role_id' })
//   role: Role;
// }
