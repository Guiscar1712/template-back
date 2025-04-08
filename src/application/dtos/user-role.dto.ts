import { IsUUID } from 'class-validator';

export class UserRoleDto {
  @IsUUID()
  user_id: string;

  @IsUUID()
  role_id: string;
}
