import { Router } from 'express';
import bookmarkControllers from './bookmark.controllers';
import verifyAuth from '../../middlewares/verifyAuth';
import { z } from 'zod';
import validateRequest from '../../middlewares/validateRequest';

const validator = z.object({
  title: z.string({ required_error: 'title is required!' }).min(6, { message: 'title must have atleast 6 characters' }),
  link: z.string({ required_error: 'link is required!' }),
  folderId: z.string({ required_error: 'Folder is required!' }),
  type: z.enum(['video', 'blog', 'book', 'documentation'], { required_error: 'Type is required!' }),
  tags: z.array(z.string()).optional(),
});

const bookmarkRoutes = Router();

bookmarkRoutes.post('/', verifyAuth, validateRequest(validator), bookmarkControllers.create);
bookmarkRoutes.get('/', verifyAuth, bookmarkControllers.readAll);
bookmarkRoutes.get('/:id', verifyAuth, bookmarkControllers.read);
bookmarkRoutes.patch('/:id', verifyAuth, bookmarkControllers.update);
bookmarkRoutes.delete('/:id', verifyAuth, bookmarkControllers.delete);

export default bookmarkRoutes;