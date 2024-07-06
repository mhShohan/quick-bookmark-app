import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface IJwtPayload extends JwtPayload {
  _id: string;
  email: string;
  role: string;
}

export interface IObjectId extends Types.ObjectId { }