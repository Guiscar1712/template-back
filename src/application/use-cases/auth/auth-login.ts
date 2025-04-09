import { inject, injectable } from 'inversify';
import { AuthService } from '@/domain/services/auth/auth-service';
import { UserService } from '@/domain/services/user/user-service';
import { compare } from 'bcryptjs';
import { TYPES } from '@/infrastructure/container/types-container';
import { AppError } from '@/interfaces/middlewares/errors/app-error';
import { AuthLoginDto } from '@/application/dtos/auth-login.dto';
import {
  cleanDocument,
  validateDocument,
} from '@/shared/utils/validate-document';

@injectable()
export class AuthLoginUseCase {
  constructor(
    @inject(TYPES.AuthService)
    private readonly authService: AuthService,

    @inject(TYPES.UserService)
    private readonly userService: UserService,
  ) {}

  async execute(document: string, password: string): Promise<AuthLoginDto> {
    try {
      const cleanedDocument = cleanDocument(document);

      if (!validateDocument(cleanedDocument)) {
        throw new AppError('Documento inválido', 400);
      }

      const user = await this.userService.findByParams({
        document: cleanedDocument,
      });

      if (!user) {
        throw new AppError('Usuário não encontrado', 404);
      }

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        throw new AppError('Credenciais inválidas', 401);
      }

      const { token, expiresIn } = await this.authService.generateToken(user);

      return { token, expiresIn };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        `Erro ao realizar login: ${
          error instanceof Error ? error.message : 'Erro desconhecido'
        }`,
        500,
      );
    }
  }
}
