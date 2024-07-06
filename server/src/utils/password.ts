import bcrypt from 'bcrypt';
import APIError from '../errorHandler/APIError';
import config from '../config';

/**
 * @param password
 * @returns hashed password
 */
const hash = async (password: string) => {
  return bcrypt.hash(password, config.SALT_ROUNDS!);
};


/**
 * @param password
 * @param hashedPassword
 */
const verify = async (password: string, hashedPassword: string) => {
  const matchedPassword = await bcrypt.compare(password, hashedPassword);

  if (!matchedPassword) {
    throw new APIError(400, 'Wrong Credentials!');
  }
};

const password = { hash, verify }

export default password;
