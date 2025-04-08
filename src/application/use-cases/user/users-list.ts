import { User } from '@/domain/entities/user';
import { UserService } from '@/domain/services/user/user-service';
import { TYPES } from '@/shared/container/types-container';
import { inject, injectable } from 'inversify';

@injectable()
export class UserListUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async findById(id: string): Promise<User | undefined> {
    return await this.userService.findById(id);
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.userService.find({});
  }
}
