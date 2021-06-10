import { Document } from "mongoose";

export interface UserDoc extends Document {
    username: string,
    email: string,
    password: string,
    verified: boolean,
    tokenVerify: string,
    apiKey: string
}