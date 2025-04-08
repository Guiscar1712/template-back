import { RoleService } from '@/domain/services/roles/role-service';

export class RoleDeleteUseCase {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async execute(id: string): Promise<void> {
    await this.roleService.delete(id);
  }
}
