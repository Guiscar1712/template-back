import { Role } from '@/domain/entities/roles';
import { RoleService } from '@/domain/services/roles/role-service';

export class RoleUpdateUseCase {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async execute(id: string, data: Partial<Role>): Promise<Role | null> {
    const existingUser = await this.roleService.findById(id);
    if (!existingUser) {
      throw new Error('Role not found');
    }

    const updatedUser = await this.roleService.update(data.role_id, data);

    return updatedUser;
  }
}
