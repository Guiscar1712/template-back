import { Role } from '@/domain/entities/roles';
import { RoleService } from '@/domain/services/roles/role-service';
import { validate } from 'class-validator';

export class RoleCreateUseCase {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  async execute(data: Partial<Role>): Promise<Role> {
    const validationErrors = await validate(data);
    if (validationErrors.length > 0) {
      throw new Error('Validation failed!');
    }

    const user = this.roleService.create(data);

    return user;
  }
}
