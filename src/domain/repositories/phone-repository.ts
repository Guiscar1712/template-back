import { Repository } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import { Phone } from '../entities/phones';

export class PhoneRepository extends AbstractRepository<Phone> {
  constructor(repository: Repository<Phone>) {
    super(repository);
  }

  async findAll(query: any): Promise<Phone[]> {
    return this.repository.find(query);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ user: { user_id: id as string } });
  }
}
