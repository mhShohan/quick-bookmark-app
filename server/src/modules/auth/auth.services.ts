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

    const user = await this.model.create(payload);

    const authToken = token.generate({ _id: user._id, email: user.email, role: user.role });
    return { token: authToken };
  }

  // login 
  async login(payload: { email: string; password: string }) {
    const user = await this.model.findOne({ email: payload.email });

    if (user) {
      await password.verify(payload.password, user.password);

      const authToken = token.generate({ _id: user._id, email: user.email, role: user.role });

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

  // get self profile
  async getAllUsers(query: Record<string, unknown>) {
    const page = query.page ? parseInt(query.page as string) : 1;
    const limit = query.limit ? parseInt(query.limit as string) : 10;
    const skip = (page - 1) * limit

    const searchQuery = query.search ? { name: { $regex: query.search as string, $options: 'i' } } : {};
    const count = await this.model.countDocuments(searchQuery);
    const totalPages = Math.ceil(count / limit);

    const users = await this.model.find(searchQuery).skip(skip).limit(limit);

    return {
      users,
      meta: {
        limit,
        page,
        totalPage: totalPages,
        totalCount: count
      }
    }
  }

}

const authServices = new Services();
export default authServices;