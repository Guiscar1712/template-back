import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { container } from '@/infrastructure/container/inversify.config';
import { TYPES } from '@/infrastructure/container/types-container';

const userRoutes = Router();

const userController = container.get<UserController>(TYPES.UserController);

userRoutes.get('/', userController.getAll.bind(userController));
userRoutes.get('/:id', userController.getById.bind(userController));
userRoutes.post('/', userController.create.bind(userController));
userRoutes.put('/', userController.update.bind(userController));
userRoutes.delete('/:id', userController.delete.bind(userController));

export default userRoutes;
