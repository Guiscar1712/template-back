import { Repository } from 'typeorm';
import { AbstractRepository } from './abstract.repository';
import { Email } from '../entities/emails';

export class EmailRepository extends AbstractRepository<Email> {
  constructor(repository: Repository<Email>) {
    super(repository);
  }

  async findAll(query: any): Promise<Email[]> {
    return this.repository.find(query);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ user: { user_id: id as string } });
  }
}
