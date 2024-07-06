import { IUser } from "../auth/auth.interface";
import User from "../auth/auth.model";

interface IPayload extends IUser { }

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

  /**
   * Update a record
   * @param id 
   * @param payload 
   */
  async update(id: string, payload: Partial<IPayload>) {
    this.model.findByIdAndUpdate(id, payload, { runValidators: true, new: true });
  }

  /**
   * Delete a record
   * @param id 
   */
  async delete(id: string) {
    this.model.findByIdAndDelete(id);
  }
}

const demo_Services = new Services();
export default demo_Services;