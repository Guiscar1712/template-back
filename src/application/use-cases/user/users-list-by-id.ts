import { UserResponseDto } from '@/application/dtos/user-response.dto';
import { UserMapper } from '@/application/mappers/user.mapper';
import { UserService } from '@/domain/services/user/user-service';
import { TYPES } from '@/infrastructure/container/types-container';
import { AppError } from '@/interfaces/middlewares/errors/app-error';
import { inject, injectable } from 'inversify';

@injectable()
export class UserListByIdUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async execute(id: string): Promise<UserResponseDto> {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new AppError('User not found', 404);
      }
      return UserMapper.toResponseDto(user);
    } catch (error) {
      throw new AppError(
        `Failed to retrieve user: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        500,
      );
    }
  }
}
