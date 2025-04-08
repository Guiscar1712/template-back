import { Repository, DeepPartial } from 'typeorm';
import { RepositoryInterface } from '../interfaces/repository.interface';

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
    return await this.repository.findOne(query);
  }

  async update(id: number | string, entity: Partial<T>): Promise<any> {
    return await this.repository.update(id, entity as any);
  }

  async delete(id: number | string): Promise<void> {
    await this.repository.delete(id);
  }
}
