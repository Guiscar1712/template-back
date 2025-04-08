import { User } from '@/domain/entities/user';
import { UserService } from '@/domain/services/user/user-service';
import { TYPES } from '@/shared/container/types-container';
import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@injectable()
export class UserUpdateUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async execute(id: string, data: Partial<User>): Promise<User> {
    const existingUser = await this.userService.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    const userInstance = plainToInstance(User, { ...existingUser, ...data });

    const validationErrors = await validate(userInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (validationErrors.length > 0) {
      const messages = validationErrors
        .map((err) => Object.values(err.constraints || {}).join(', '))
        .join('; ');
      throw new Error(`Validation failed: ${messages}`);
    }

    return await this.userService.update(id, data);
  }
}
