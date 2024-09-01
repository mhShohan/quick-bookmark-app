import { Router } from 'express';
import authControllers from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import authValidators from './auth.validators';
import verifyAuth from '../../middlewares/verifyAuth';
import verifyRole from '../../middlewares/verifyRole';

const authRoutes = Router();

authRoutes.get('/self', verifyAuth, verifyRole(['USER', 'ADMIN']), authControllers.self);
authRoutes.get('/users', verifyAuth, verifyRole(['ADMIN']), authControllers.getAllUsers);
authRoutes.patch('/', verifyAuth, authControllers.update);
authRoutes.post('/register', validateRequest(authValidators.register), authControllers.register);
authRoutes.post('/login', validateRequest(authValidators.login), authControllers.login);

export default authRoutes;
