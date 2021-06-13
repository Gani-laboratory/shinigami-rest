import { Request } from "express";
import { UserDoc } from "./mongoose.interface";

export interface CustomRequest extends Request {
    locals: Record<string, string|null|UserDoc>
}