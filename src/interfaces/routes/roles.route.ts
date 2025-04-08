import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';

const routes = Router();

routes.get('/', new RoleController().getAll);
routes.get('/:id', new RoleController().getById);
routes.post('/', new RoleController().create);
routes.put('/:id', new RoleController().update);
routes.delete('/:id', new RoleController().delete);

export default routes;
