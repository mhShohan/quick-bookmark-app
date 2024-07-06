import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';
import folderRoutes from '../modules/folder/folder.routes';

const rootRoutes = Router();

rootRoutes.use('/auth', authRoutes);
rootRoutes.use('/folders', folderRoutes);

export default rootRoutes;
