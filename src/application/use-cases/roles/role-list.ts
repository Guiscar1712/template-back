import { Role } from '@/domain/entities/roles';
import { RoleService } from '@/domain/services/roles/role-service';

export class RoleListUseCase {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async findById(id: string): Promise<Role | undefined> {
    return await this.roleService.findById(id);
  }

  async findAll(): Promise<Role[] | undefined> {
    return await this.roleService.find({});
  }
}
