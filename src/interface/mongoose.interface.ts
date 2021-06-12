import { Document } from "mongoose";
import { roles } from "../middleware/permission.middleware";

export interface UserDoc extends Document {
    username: string,
    email: string,
    password: string,
    role: roles,
    verified: boolean,
    tokenVerify: string,
    apiKey: string
}