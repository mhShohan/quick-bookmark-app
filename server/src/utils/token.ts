import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../config';
import APIError from '../errorHandler/APIError';
import { IJwtPayload } from '../interfaces/common';

/**
 * create jwt token
 * @param payload 
 * @returns 
 */
const generate = (payload: IJwtPayload) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET!, { expiresIn: config.JWT_EXPIRES_IN });
};


/**
 * verify jwt token
 * @param token 
 * @returns 
 */
const verify = (token: string) => {
  try {
    return jwt.verify(token, config.JWT_ACCESS_SECRET as string) as IJwtPayload;
  } catch (error) {
    throw new APIError(httpStatus.UNAUTHORIZED, 'Unauthorize! please login', 'Unauthorize');
  }
}

const token = { generate, verify }
export default token;
