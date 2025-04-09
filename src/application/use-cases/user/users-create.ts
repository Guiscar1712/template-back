import { User } from '@/domain/entities/user';
import { UserService } from '@/domain/services/user/user-service';
import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { IHashedPassword } from '@/domain/interfaces/hashed-password.interface';
import { TYPES } from '@/infrastructure/container/types-container';
import { ValidateError } from '@/interfaces/middlewares/errors/validate-error';
import { AppError } from '@/interfaces/middlewares/errors/app-error';
import { UserMapper } from '@/application/mappers/user.mapper';
import { UserResponseDto } from '@/application/dtos/user-response.dto';
import { UserRequestDto } from '@/application/dtos/user-request.dto';
import { fieldsValidationErrors } from '@/shared/utils/fields-validation-errors';
import {
  cleanDocument,
  validateDocument,
} from '@/shared/utils/validate-document';

@injectable()
export class UserCreateUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,

    @inject(TYPES.HashedPassword)
    private passwordHasher: IHashedPassword,
  ) {}

  async execute(data: Partial<User>): Promise<UserResponseDto> {
    try {
      const userInstance = plainToInstance(UserRequestDto, data);

      const validationErrors = await validate(userInstance, {
        dismissDefaultMessages: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        skipMissingProperties: false,
      });

      if (validationErrors.length > 0) {
        const fieldErrors = fieldsValidationErrors(validationErrors);
        throw new ValidateError(fieldErrors);
      }

      const cleanedDocument = cleanDocument(data.document);

      if (!validateDocument(cleanedDocument)) {
        throw new AppError('Documento inválido', 400);
      }

      data.document = cleanedDocument;

      if (!data.password) {
        throw new ValidateError([
          { field: 'password', errors: ['Password is required'] },
        ]);
      }

      const hashedPassword = await this.passwordHasher.hashPassword(
        data.password,
      );
      data.password = hashedPassword;

      const user = await this.userService.create({
        ...data,
        password: hashedPassword,
      });

      return UserMapper.toResponseDto(user);
    } catch (error) {
      if (error instanceof ValidateError) throw error;

      throw new AppError(
        `User creation failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        500,
      );
    }
  }
}
