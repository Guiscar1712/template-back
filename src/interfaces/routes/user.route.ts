import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { container } from '@/infrastructure/container/inversify.config';
import { TYPES } from '@/infrastructure/container/types-container';
import jwtMiddleware from '../middlewares/auth/jwt-middleware';

const userRoutes = Router();

const userController = container.get<UserController>(TYPES.UserController);

userRoutes.get('/', jwtMiddleware, userController.getAll.bind(userController));
userRoutes.get(
  '/:id',
  jwtMiddleware,
  userController.getById.bind(userController),
);
userRoutes.post('/', jwtMiddleware, userController.create.bind(userController));
userRoutes.put('/', jwtMiddleware, userController.update.bind(userController));
userRoutes.delete(
  '/:id',
  jwtMiddleware,
  userController.delete.bind(userController),
);

export default userRoutes;
