import { Types } from "mongoose";
import APIError from "../../errorHandler/APIError";
import Folder from "./folder.model";

interface IPayload {
  name: string;
  userId: string;
}

class Services {
  private model = Folder;

  /**
   * Create a new record
   * @param payload 
   */
  async create(userId: string, payload: IPayload) {
    payload.userId = (userId)
    return this.model.create(payload)
  }

  /**
   * Read all records
   * @param
   */
  async readAll(query: Record<string, unknown>, userId: string) {

    return this.model.find({ userId: userId, ...query });
  }

  /**
   * Read a single record
   * @param id 
   */
  async read(id: string, userId: string) {
    return this._isExist(id, userId);
  }

  /**
   * Read bookmarks of a folder
   * @param id 
   */
  async bookmarksOfFolder(id: string, userId: string) {
    await this._isExist(id, userId);

    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id), userId: new Types.ObjectId(userId) } },
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'folderId',
          as: 'bookmarks'
        }
      }
    ])
  }

  /**
   * Update a record
   * @param id 
   * @param payload 
   */
  async update(id: string, userId: string, payload: Partial<IPayload>) {
    await this._isExist(id, userId);

    return this.model.findByIdAndUpdate(id, payload, { runValidators: true, new: true });
  }

  /**
   * Delete a record
   * @param id 
   */
  async delete(id: string, userId: string) {
    await this._isExist(id, userId);

    return this.model.findByIdAndDelete(id);
  }

  private async _isExist(id: string, userId: string) {
    const folder = await this.model.findOne({ _id: id, userId });

    if (!folder) throw new APIError(404, 'Folder is not found')
    return folder;
  }
}

const folderServices = new Services();
export default folderServices;