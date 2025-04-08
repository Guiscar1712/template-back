export interface RepositoryInterface<T> {
  save(entity: T): Promise<T>;
  findById(id: string | number): Promise<T | undefined>;
  findAll(query: any): Promise<T[]>;
  update(id: string | number, entity: Partial<T>): Promise<T | undefined>;
  delete(id: string | number): Promise<void>;
}
