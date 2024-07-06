import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import folderServices from './folder.services';

class Controllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = folderServices;
  private messageTitle = 'Folder';

  // Create
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.user._id, req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.CREATED,
      message: `${this.messageTitle} create Successfully`,
      data: result,
    });
  });

  // readAll
  readAll = asyncHandler(async (req, res) => {
    const result = await this.services.readAll(req.query);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Fetched Successfully`,
      data: result,
    });
  });

  // read
  read = asyncHandler(async (req, res) => {
    const result = await this.services.read(req.params.id, req.user._id);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Fetched Successfully`,
      data: result,
    });
  });

  // read
  bookmarksOfFolder = asyncHandler(async (req, res) => {
    const result = await this.services.bookmarksOfFolder(req.params.id, req.user._id);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} an bookmarks Fetched Successfully`,
      data: result[0],
    });
  });



  // update
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.params._id, req.user._id, req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Updated Successfully`,
      data: result,
    });
  });

  // update
  delete = asyncHandler(async (req, res) => {
    const result = await this.services.delete(req.params._id, req.user._id);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Updated Successfully`,
      data: result,
    });
  });
}

const folderControllers = new Controllers();
export default folderControllers;