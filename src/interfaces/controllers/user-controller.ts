import { UsersUpdateUseCase } from '@/application/use-cases/user/users-update';
import { UserCreateUseCase } from '@/application/use-cases/user/users-create';
import { UserDeleteUseCase } from '@/application/use-cases/user/users-delete';
import { UserListUseCase } from '@/application/use-cases/user/users-list';
import { UserListByIdUseCase } from '@/application/use-cases/user/users-list-by-id';
import { TYPES } from '@/infrastructure/container/types-container';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

@injectable()
export class UserController {
  constructor(
    @inject(TYPES.UserCreateUseCase)
    private createUseCase: UserCreateUseCase,

    @inject(TYPES.UsersUpdateUseCase)
    private updateUseCase: UsersUpdateUseCase,

    @inject(TYPES.UserListUseCase)
    private listUseCase: UserListUseCase,

    @inject(TYPES.UserListByIdUseCase)
    private listByIdUseCase: UserListByIdUseCase,

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
      const data = await this.updateUseCase.execute(req.body);
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
      const list = await this.listUseCase.execute();
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

      const data = await this.listByIdUseCase.execute(id);

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
