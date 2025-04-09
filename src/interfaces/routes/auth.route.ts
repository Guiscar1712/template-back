import { Router } from 'express';
import { container } from '@/infrastructure/container/inversify.config';
import { TYPES } from '@/infrastructure/container/types-container';
import { AuthController } from '../controllers/auth.controller';

const userRoutes = Router();

const authController = container.get<AuthController>(TYPES.AuthController);

userRoutes.post('/login', authController.login.bind(authController));

export default userRoutes;
