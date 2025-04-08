import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { AuthLoginUseCase } from '@/application/use-cases/auth/auth-login';
import { TYPES } from '@/infrastructure/container/types-container';

@injectable()
export class AuthController {
  constructor(
    @inject(TYPES.AuthLoginUseCase)
    private authLoginUseCase: AuthLoginUseCase,
  ) {}

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authLoginUseCase.execute(email, password);

      res.success({
        data: token,
        statusCode: 200,
      });
    } catch (error) {
      res.error({
        message: 'Erro ao autenticar usuário',
        customError: error,
        statusCode: 401,
      });
    }
  }
}
