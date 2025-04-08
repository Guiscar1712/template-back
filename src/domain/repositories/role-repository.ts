import { Repository } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import { Role } from '../entities/roles';

export class RoleRepository extends AbstractRepository<Role> {
  constructor(repository: Repository<Role>) {
    super(repository);
  }
}
