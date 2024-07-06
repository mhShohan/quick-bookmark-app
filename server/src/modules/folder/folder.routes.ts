import { Router } from 'express';
import folderControllers from './folder.controllers';
import verifyAuth from '../../middlewares/verifyAuth';
import { z } from 'zod';
import validateRequest from '../../middlewares/validateRequest';

const validator = z.object({
  name: z.string({ required_error: 'Name is required!' }).min(6, { message: 'Name must have atleast 3 characters' }),
});

const folderRoutes = Router();

folderRoutes.post('/', verifyAuth, validateRequest(validator), folderControllers.create);
folderRoutes.get('/', verifyAuth, folderControllers.readAll);
folderRoutes.get('/:id', verifyAuth, folderControllers.read);
folderRoutes.get('/:id', verifyAuth, folderControllers.update);

export default folderRoutes;