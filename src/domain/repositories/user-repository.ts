import { Repository } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import { User } from '../entities/user';

export class UserRepository extends AbstractRepository<User> {
  constructor(repository: Repository<User>) {
    super(repository);
  }

  async findAll(query: any): Promise<User[]> {
    return this.repository.find(query);
  }
}
