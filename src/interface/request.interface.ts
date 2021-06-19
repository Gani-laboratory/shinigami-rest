import { Request } from "express";
import { UserDoc } from "./mongoose.interface";

export type CustomRequest = Request & {
    locals: Record<string, string|null|UserDoc>
}