import { User } from '@/domain/entities/user';
import { UserService } from '@/domain/services/user/user-service';
import { inject, injectable } from 'inversify';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TYPES } from '@/infrastructure/container/types-container';
import { AppError } from '@/interfaces/middlewares/errors/app-error';
import { ValidateError } from '@/interfaces/middlewares/errors/validate-error';
import { fieldsValidationErrors } from '@/shared/utils/fields-validation-errors';
import { UserUpdateRequestDto } from '@/application/dtos/user-update-request.dto';
import { UserMapper } from '@/application/mappers/user.mapper';
import { UserResponseDto } from '@/application/dtos/user-response.dto';
import {
  cleanDocument,
  validateDocument,
} from '@/shared/utils/validate-document';

@injectable()
export class UsersUpdateUseCase {
  constructor(
    @inject(TYPES.UserService)
    private userService: UserService,
  ) {}

  async execute(data: Partial<User>): Promise<UserResponseDto> {
    try {
      const existingUser = await this.userService.findById(data.user_id);

      if (!existingUser) {
        throw new AppError('User not found', 404);
      }

      const userInstance = plainToInstance(UserUpdateRequestDto, {
        ...data,
      });

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

      let cleanedDocument = existingUser.document;

      if (data.document) {
        const cleanedDocument = cleanDocument(data.document);

        if (!validateDocument(cleanedDocument)) {
          throw new AppError('Documento inválido', 400);
        }
      }

      const userUpdated = await this.userService.update(data.user_id, {
        name: data.name,
        document: cleanedDocument,
        role: data.role,
        addresses: data.addresses,
        phones: data.phones,
        emails: data.emails,
      });

      return UserMapper.toResponseDto(userUpdated);
    } catch (error) {
      console.log(error);
      if (error instanceof ValidateError) throw error;

      throw new AppError(
        `User update failed: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        500,
      );
    }
  }
}
