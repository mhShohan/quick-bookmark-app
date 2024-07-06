import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes';

const rootRoutes = Router();

rootRoutes.use('/auth', authRoutes);

export default rootRoutes;
