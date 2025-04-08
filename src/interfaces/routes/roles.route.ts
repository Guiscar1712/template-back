import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';

const routes = Router();

routes.get('/', new RoleController().getAll);
routes.get('/:id', new RoleController().getById);

export default routes;
