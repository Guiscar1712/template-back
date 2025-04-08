// shared/container/inversify.config.ts
import { UserCreateUseCase } from '@/application/use-cases/user/users-create';
import { UserRepository } from '@/domain/repositories/user-repository';
import { UserService } from '@/domain/services/user/user-service';
import { Container } from 'inversify';
import { TYPES } from './types-container';
import { UserUpdateUseCase } from '@/application/use-cases/user/user-update';
import { UserDeleteUseCase } from '@/application/use-cases/user/users-delete';
import { UserListUseCase } from '@/application/use-cases/user/users-list';
import { UserController } from '@/interfaces/controllers/user-controller';
import { IHashedPassword } from '@/domain/interfaces/hashed-password.interface';
import { HashedPassword } from '../utils/hashed-password';
import { AuthService } from '@/domain/services/auth/auth-service';
import { AuthLoginUseCase } from '@/application/use-cases/auth/auth-login';

const container = new Container();

container.bind<UserController>(TYPES.UserController).to(UserController);

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);
container
  .bind<UserCreateUseCase>(TYPES.UserCreateUseCase)
  .to(UserCreateUseCase);
container
  .bind<UserUpdateUseCase>(TYPES.UserUpdateUseCase)
  .to(UserUpdateUseCase);
container.bind<UserListUseCase>(TYPES.UserListUseCase).to(UserListUseCase);
container
  .bind<UserDeleteUseCase>(TYPES.UserDeleteUseCase)
  .to(UserDeleteUseCase);

container.bind<IHashedPassword>(TYPES.HashedPassword).to(HashedPassword);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<AuthLoginUseCase>(TYPES.AuthLoginUseCase).to(AuthLoginUseCase);

export { container };
