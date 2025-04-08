import { RepositoryInterface } from '@/application/interfaces/repository';
import { Repository, DeepPartial } from 'typeorm';

export abstract class AbstractRepository<T> implements RepositoryInterface<T> {
  protected repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(this.repository.create(entity));
  }

  async findAll(query: any): Promise<T[]> {
    return this.repository.find({ where: query });
  }

  async findById(query: any): Promise<T | undefined> {
    return this.repository.findOne({ where: query });
  }

  async update(
    id: number | string,
    entity: Partial<T>,
  ): Promise<T | undefined> {
    const existingEntity = await this.findById(id);
    if (!existingEntity) {
      return null;
    }
    await this.repository.update(id, entity as any);
    return this.findById(id);
  }

  async delete(id: number | string): Promise<void> {
    await this.repository.delete(id);
  }
}
