import { Repository } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import { Address } from '../entities/address';

export class AddressRepository extends AbstractRepository<Address> {
  constructor(repository: Repository<Address>) {
    super(repository);
  }

  async findAll(query: any): Promise<Address[]> {
    return this.repository.find(query);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ user: { user_id: id as string } });
  }
}
