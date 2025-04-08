import { UserUpdateUseCase } from '@/application/use-cases/user/user-update';
import { UserCreateUseCase } from '@/application/use-cases/user/users-create';
import { UserDeleteUseCase } from '@/application/use-cases/user/users-delete';
import { UserListUseCase } from '@/application/use-cases/user/users-list';
import { TYPES } from '@/shared/container/types-container';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserCreateUseCase)
    private createUseCase: UserCreateUseCase,

    @inject(TYPES.UserUpdateUseCase)
    private updateUseCase: UserUpdateUseCase,

    @inject(TYPES.UserListUseCase)
    private listUseCase: UserListUseCase,

    @inject(TYPES.UserDeleteUseCase)
    private deleteUseCase: UserDeleteUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.createUseCase.execute(req.body);
      res.success({ data: data, statusCode: 201 });
    } catch (error) {
      res.error({
        message: 'Erro ao cadastrar usuário',
        customError: error,
        statusCode: 400,
      });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.updateUseCase.execute(id, req.body);
      res.success({ data: data, statusCode: 200 });
    } catch (error) {
      res.error({
        message: 'Erro ao atualizar usuário',
        customError: error,
        statusCode: 400,
      });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const list = await this.listUseCase.findAll();
      res.success({ data: list, statusCode: 200 });
    } catch (error) {
      res.error({
        message: 'Erro ao buscar usuários',
        customError: error,
        statusCode: 400,
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = await this.listUseCase.findById(id);

      res.success({ data: data, statusCode: 200 });
    } catch (error) {
      res.error({
        message: 'Erro ao atualizar usuário',
        customError: error,
        statusCode: 400,
      });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteUseCase.execute(id);
      res.success({ data: null, statusCode: 204 });
    } catch (error) {
      res.error({
        message: 'Erro ao atualizar usuário',
        customError: error,
        statusCode: 400,
      });
    }
  }
}
