import httpStatus from "http-status";
import APIError from "../../errorHandler/APIError";
import password from "../../utils/password";
import { IUser } from "./auth.interface";
import User from "./auth.model";
import token from "../../utils/token";

class Services {
  private model = User;

  async register(payload: IUser) {
    const hashedPassword = await password.hash(payload.password);
    payload.password = hashedPassword

    return this.model.create(payload);
  }

  // login 
  async login(payload: { email: string; password: string }) {
    const user = await this.model.findOne({ email: payload.email });

    if (user) {
      await password.verify(payload.password, user.password);

      const authToken = token.generate({ _id: user._id, email: user.email });
      return { token: authToken };
    } else {
      throw new APIError(httpStatus.BAD_REQUEST, 'WrongCredentials');
    }
  }

  // update
  async update(id: string, payload: Partial<IUser>) {

    return { id, payload }
  }

  // get self profile
  async self(id: string) {
    return this.model.findById(id);
  }




}

const authServices = new Services();
export default authServices;