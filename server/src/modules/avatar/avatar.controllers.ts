import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import avatarServices from './avatar.services';

class Controllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = avatarServices;
  private messageTitle = 'Avatar';

  // Create
  create = asyncHandler(async (req, res) => {
    const result = await this.services.create(req.body);

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

  // readAll
  read = asyncHandler(async (req, res) => {
    const result = await this.services.read(req.params.id);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Fetched Successfully`,
      data: result,
    });
  });
}


const avatarControllers = new Controllers();
export default avatarControllers;