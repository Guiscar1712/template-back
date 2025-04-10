import { UserResponseDto } from '@/application/dtos/user-response.dto';
import { UserMapper } from '@/application/mappers/user.mapper';
import { User } from '@/domain/entities/user';
import { UserService } from '@/domain/services/user/user-service';
import { TYPES } from '@/infrastructure/container/types-container';
import { AppError } from '@/interfaces/middlewares/errors/app-error';
import { inject, injectable } from 'inversify';

@injectable()
export class UserListUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async execute(): Promise<UserResponseDto[]> {
    try {
      const listUsers = await this.userService.find({});
      return listUsers.map((user) => {
        return UserMapper.toResponseDto(user);
      });
    } catch (error) {
      throw new AppError(
        `Failed to list users: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        500,
      );
    }
  }
}
