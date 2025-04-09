// shared/container/inversify.config.ts
import { UserCreateUseCase } from '@/application/use-cases/user/users-create';
import { UserRepository } from '@/domain/repositories/user-repository';
import { UserService } from '@/domain/services/user/user-service';
import { Container } from 'inversify';
import { TYPES } from './types-container';
import { UsersUpdateUseCase } from '@/application/use-cases/user/users-update';
import { UserDeleteUseCase } from '@/application/use-cases/user/users-delete';
import { UserListUseCase } from '@/application/use-cases/user/users-list';
import { UserController } from '@/interfaces/controllers/user-controller';
import { IHashedPassword } from '@/domain/interfaces/hashed-password.interface';
import { AuthService } from '@/domain/services/auth/auth-service';
import { AuthLoginUseCase } from '@/application/use-cases/auth/auth-login';
import { UserListByIdUseCase } from '@/application/use-cases/user/users-list-by-id';
import { HashedPassword } from '@/shared/utils/hashed-password';
import { AuthController } from '@/interfaces/controllers/auth.controller';

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);
container
  .bind<UserCreateUseCase>(TYPES.UserCreateUseCase)
  .to(UserCreateUseCase);
container
  .bind<UsersUpdateUseCase>(TYPES.UsersUpdateUseCase)
  .to(UsersUpdateUseCase);
container.bind<UserListUseCase>(TYPES.UserListUseCase).to(UserListUseCase);
container
  .bind<UserDeleteUseCase>(TYPES.UserDeleteUseCase)
  .to(UserDeleteUseCase);

container.bind<IHashedPassword>(TYPES.HashedPassword).to(HashedPassword);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthLoginUseCase>(TYPES.AuthLoginUseCase).to(AuthLoginUseCase);
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<UserListByIdUseCase>(TYPES.UserListByIdUseCase)
  .to(UserListByIdUseCase);

export { container };
