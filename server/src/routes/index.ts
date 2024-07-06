import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import folderRoutes from '../modules/folder/folder.routes';
import bookmarkRoutes from '../modules/bookmark/bookmark.routes';

const rootRoutes = Router();

rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/folders', folderRoutes);
rootRoutes.use('/bookmarks', bookmarkRoutes);

export default rootRoutes;
