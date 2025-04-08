import { AppDataSource } from '@/data-source';
import { Role } from '@/domain/entities/roles';
import { RoleRepository } from '@/domain/repositories/role-repository';

export class RoleService {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository(AppDataSource.getRepository(Role));
  }

  async create(data: Partial<Role>): Promise<Role> {
    return this.roleRepository.save(data);
  }

  async update(id: string, data: Partial<Role>): Promise<Role> {
    return this.roleRepository.update(id, data);
  }

  async findById(id: string): Promise<Role> {
    return this.roleRepository.findById(id);
  }

  async find(query: any): Promise<Role[]> {
    return this.roleRepository.findAll(query || null);
  }

  async delete(id: string): Promise<void> {
    return this.roleRepository.delete(id);
  }
}
