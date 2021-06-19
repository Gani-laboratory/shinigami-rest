import mongoose from "mongoose";
import { UserDoc } from "../interface/mongoose.interface";
const schema = new mongoose.Schema<UserDoc>({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: Number,
	verified: Boolean,
	tokenVerify: String,
	apiKey: String
}, {
	timestamps: true
});

export default mongoose.model<UserDoc>("users", schema);