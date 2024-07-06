import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import APIError from '../errorHandler/APIError';
import { IJwtPayload } from '../interfaces/common';

const verifyAuth: RequestHandler = (req, _res, next) => {
  const bearerToken = req.headers.authorization;

  if (bearerToken) {
    const token = bearerToken.split(' ')[1];

    if (token) {
      try {
        const decode = jwt.verify(token, config.JWT_ACCESS_SECRET as string) as IJwtPayload;

        req.user = {
          _id: decode?._id,
          email: decode?.email,
          role: decode?.role,
        };

        next();
      } catch (error) {
        throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorize! please login', 'Unauthorize');
      }
    } else {
      throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorize! please login', 'Unauthorize');
    }
  } else {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorize! please login', 'Unauthorize');
  }
};

export default verifyAuth;