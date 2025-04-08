import { Router } from 'express';
import { container } from '@/shared/container/inversify.config';
import { TYPES } from '@/shared/container/types-container';
import { UserController } from '../controllers/user-controller';

const userRoutes = Router();

const userController = container.get<UserController>(TYPES.UserController);

userRoutes.get('/', userController.getAll.bind(userController));
userRoutes.get('/:id', userController.getById.bind(userController));
userRoutes.post('/', userController.create.bind(userController));
userRoutes.put('/:id', userController.update.bind(userController));
userRoutes.delete('/:id', userController.delete.bind(userController));

export default userRoutes;
