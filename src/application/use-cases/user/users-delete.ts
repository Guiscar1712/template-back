import { UserService } from '@/domain/services/user/user-service';
import { TYPES } from '@/shared/container/types-container';
import { inject, injectable } from 'inversify';

@injectable()
export class UserDeleteUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async execute(id: string): Promise<void> {
    await this.userService.delete(id);
  }
}
