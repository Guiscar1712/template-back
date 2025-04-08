import { RoleListUseCase } from '@/application/use-cases/roles/role-list';
import { Request, Response } from 'express';

export class RoleController {
  async getAll(req: Request, res: Response): Promise<void> {
    const roleListUseCase = new RoleListUseCase();

    try {
      const list_role = await roleListUseCase.findAll();
      res.status(200).json(list_role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    const roleListUseCase = new RoleListUseCase();

    try {
      const { id } = req.params;

      const role = await roleListUseCase.findById(id);

      if (!role) {
        res.status(404).json({ error: 'roleect not found' });
        return;
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
