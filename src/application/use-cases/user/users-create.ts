import { User } from '@/domain/entities/user';
import { UserService } from '@/domain/services/user/user-service';
import { TYPES } from '@/shared/container/types-container';
import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { IHashedPassword } from '@/domain/interfaces/hashed-password.interface';

@injectable()
export class UserCreateUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,

    @inject(TYPES.HashedPassword)
    private passwordHasher: IHashedPassword,
  ) {}

  async execute(data: Partial<User>): Promise<User> {
    const userInstance = plainToInstance(User, data);

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

    if (!data.password) {
      throw new Error('Password is required');
    }

    const hashedPassword = await this.passwordHasher.hashPassword(
      data.password,
    );
    data.password = hashedPassword;

    const user = await this.userService.create(data);
    return user;
  }
}
