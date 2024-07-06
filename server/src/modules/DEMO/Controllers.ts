import asyncHandler from '../../lib/asyncHandler';
import STATUS from '../../lib/httpStatus';
import sendResponse from '../../lib/sendResponse';
import demo_Services from './Services';

class Controllers {
  private sendResponse = sendResponse;
  private STATUS = STATUS;
  private services = demo_Services;
  private messageTitle = '';

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



  // update
  update = asyncHandler(async (req, res) => {
    const result = await this.services.update(req.params._id, req.body);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Updated Successfully`,
      data: result,
    });
  });

  // update
  delete = asyncHandler(async (req, res) => {
    const result = await this.services.delete(req.params._id);

    this.sendResponse(res, {
      success: true,
      statusCode: this.STATUS.OK,
      message: `${this.messageTitle} Updated Successfully`,
      data: result,
    });
  });
}

const demo_Controllers = new Controllers();
export default demo_Controllers;