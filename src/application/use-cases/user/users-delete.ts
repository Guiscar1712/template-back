import { UserService } from '@/domain/services/user/user-service';
import { TYPES } from '@/infrastructure/container/types-container';
import { AppError } from '@/interfaces/middlewares/errors/app-error';
import { inject, injectable } from 'inversify';

@injectable()
export class UserDeleteUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const existingUser = await this.userService.findById(id);
      if (!existingUser) {
        throw new AppError('User not found', 404);
      }

      await this.userService.delete(id);
    } catch (error) {
      throw new AppError(
        `User deletion failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        500,
      );
    }
  }
}
