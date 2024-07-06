import APIError from "../../errorHandler/APIError";
import Folder from "../folder/folder.model";
import Bookmark from "./bookmark.model";

interface IPayload {
  title: string;
  link: string;
  folderId: string;
  userId: string;
  type: 'video' | 'blog' | 'book' | 'documentation';
}

class Services {
  private model = Bookmark;

  /**
   * Create a new record
   * @param payload 
   */
  async create(userId: string, payload: IPayload) {
    await this._isFolderExist(payload.folderId, userId);

    payload.userId = userId;

    return this.model.create(payload);
  }

  /**
   * Read all records
   * @param
   */
  async readAll(query: Record<string, unknown>) {
    return this.model.find(query);
  }

  /**
   * Read a single record
   * @param id 
   */
  async read(id: string) {
    return this.model.findById(id);
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
  async delete(id: string) {
    this.model.findByIdAndDelete(id);
  }

  private async _isFolderExist(id: string, userId: string) {
    const folder = await Folder.findOne({ _id: id, userId });

    if (!folder) throw new APIError(404, 'Folder is not found')
    return folder;
  }

  private async _isExist(id: string, userId: string) {
    console.log({ id, userId })
    const folder = await this.model.findOne({ _id: id, userId });

    if (!folder) throw new APIError(404, 'Bookmark is not found')
    return folder;
  }
}

const bookmarkServices = new Services();
export default bookmarkServices;