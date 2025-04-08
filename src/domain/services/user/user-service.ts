import { AppDataSource } from '@/data-source';
import { User } from '@/domain/entities/user';
import { UserRepository } from '@/domain/repositories/user-repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository(AppDataSource.getRepository(User));
  }

  async create(data: Partial<User>): Promise<User> {
    return this.userRepository.save(data);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.userRepository.update(id, data);
  }

  async findByParams(params: any): Promise<User> {
    const query = {} as any;

    if (params.email) {
      query.email = params.email;
    }

    if (params.document) {
      query.document = params.document;
    }

    return this.userRepository.findById({
      where: query,
      relations: ['phones', 'addresses', 'emails', 'roles', 'roles.role'],
    });
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findById({
      where: { user_id: id as string },
      relations: ['phones', 'addresses', 'emails', 'roles', 'roles.role'],
    });
  }

  async find(query: any): Promise<User[]> {
    return this.userRepository.findAll({
      relations: ['phones', 'addresses', 'emails', 'roles', 'roles.role'],
    });
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }
}
