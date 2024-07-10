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
   * @param query
   */
  async readAll(query: Record<string, unknown>) {
    const page = query.page ? parseInt(query.page as string) : 1;
    const limit = query.limit ? parseInt(query.limit as string) : 20;
    const skip = (page - 1) * limit;

    const searchQuery: Record<string, unknown> = query.title ? { title: { $regex: query.title as string, $options: 'i' } } : {};

    if (query.tag) {
      searchQuery.tags = { $regex: query.tag as string, $options: 'i' }
    }

    if (query.type) {
      searchQuery.type = query.type as string;
    }

    if (query.folderId) {
      searchQuery.folderId = query.folderId as string;
    }

    if (query.search) {
      searchQuery.$or = [
        { title: { $regex: query.search as string, $options: 'i' } },
        { tags: { $regex: query.search as string, $options: 'i' } }
      ]
    }

    const totalCount = await this.model.countDocuments(searchQuery);
    const totalPage = Math.ceil(totalCount / limit);

    const meta = {
      totalCount,
      page,
      limit,
      totalPage
    }

    const data = await this.model.find(searchQuery).sort({ stared: -1 }).limit(limit).skip(skip);

    return { data, meta };
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
    return this.model.findByIdAndDelete(id);
  }

  private async _isFolderExist(id: string, userId: string) {
    const folder = await Folder.findOne({ _id: id, userId });

    if (!folder) throw new APIError(404, 'Folder is not found')
    return folder;
  }

  private async _isExist(id: string, userId: string) {
    const folder = await this.model.findOne({ _id: id, userId });

    if (!folder) throw new APIError(404, 'Bookmark is not found')
    return folder;
  }
}

const bookmarkServices = new Services();
export default bookmarkServices;