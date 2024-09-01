import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import authServices from './auth.services';

class Controllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = authServices;
  private messageTitle = 'User';

  // Create
  register = asyncHandler(async (req, res) => {
    const result = await this.services.register(req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.CREATED,
      message: `${this.messageTitle} registered Successfully`,
      data: result,
    });
  });

  // login
  login = asyncHandler(async (req, res) => {
    const result = await this.services.login(req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Login Successfully`,
      data: result,
    });
  });

  // get self profile
  self = asyncHandler(async (req, res) => {
    const result = await this.services.self(req.user._id as string);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Fetched Successfully`,
      data: result,
    });
  });

  // get All Users
  getAllUsers = asyncHandler(async (req, res) => {
    const result = await this.services.getAllUsers(req.query);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Fetched Successfully`,
      data: result.users,
      meta: result.meta,
    });
  });

  // update
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.user._id as string, req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Updated Successfully`,
      data: result,
    });
  });
}

const authControllers = new Controllers();
export default authControllers;