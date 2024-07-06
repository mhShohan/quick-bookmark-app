import { Router } from 'express';
import authControllers from './auth.controllers';
import validateRequest from '../../middlewares/validateRequest';
import authValidators from './auth.validators';
import verifyAuth from '../../middlewares/verifyAuth';

const authRoutes = Router();

authRoutes.post('/', verifyAuth, authControllers.self);
authRoutes.patch('/', verifyAuth, authControllers.update);
authRoutes.post('/register', authControllers.register);
authRoutes.post('/login', validateRequest(authValidators.login), authControllers.login);

export default authRoutes;
