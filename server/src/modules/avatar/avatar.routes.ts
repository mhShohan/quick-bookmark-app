import { Router } from 'express';
import { z } from 'zod';
import validateRequest from '../../middlewares/validateRequest';
import verifyAuth from '../../middlewares/verifyAuth';
import avatarControllers from './avatar.controllers';
import verifyRole from '../../middlewares/verifyRole';

const validator = z.object({
  url: z.string({ required_error: 'link is required!' }),
});

const avatarRoutes = Router();

avatarRoutes.use(verifyAuth, verifyRole(['ADMIN']));

avatarRoutes.post('/', validateRequest(validator), avatarControllers.create);
avatarRoutes.get('/', avatarControllers.readAll);
avatarRoutes.get('/:id', avatarControllers.read);

export default avatarRoutes;