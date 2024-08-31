import User from "../auth/auth.model";
import { IAvatar } from "./avatar.model";

interface IPayload extends IAvatar { }

class Services {
  private model = User;

  /**
   * Create a new record
   * @param payload 
   */
  async create(payload: IPayload) {
    this.model.create(payload);
  }

  /**
   * Read all records
   * @param
   */
  async readAll(query: Record<string, unknown>) {
    this.model.find(query);
  }

  /**
   * Read a single record
   * @param id 
   */
  async read(id: string) {
    this.model.findById(id);
  }

}

const avatarServices = new Services();
export default avatarServices;