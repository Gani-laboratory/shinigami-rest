/* eslint-disable @typescript-eslint/no-explicit-any */
import { getByEmail } from "../services/users.service";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../interface/request.interface";
import { UserDoc } from "interface/mongoose.interface";
import { storage } from "../util/simple";
import jwt from "jsonwebtoken";

enum roles {
    owner = 1,
    admin,
    member
}
const auth = (req: CustomRequest, res: Response, next: NextFunction): void|Response<any, Record<string, any>> => {
	const apiKey = req.headers["x-apikey"];
	if (!apiKey) return res.status(401).json({ status: res.statusCode, message: "Missing x-apikey in header" });
	const data: UserDoc = storage.get(apiKey as string) as UserDoc;
	return jwt.verify(apiKey as string, process.env.SECRET as string, async (e, decoded) => {
		if (e) return res.status(400).json({ status: res.statusCode, message: "Invalid apikey" });
		try {
			const account = data ? data : await getByEmail((<any>decoded).email);
			if (!data) storage.set(apiKey as string, account);
			if ((<any>decoded).role !== account?.role) return res.status(403).json({ status: res.statusCode, message: "Dame desu yo >_<" });
			req.locals = {
				account: account,
				apikey: decoded as any
			};
			// res.append();
			next();
		} catch {
			return res.status(403).json({ status: res.statusCode, message: "Invalid Api Key" });
		}
	});
};

export { roles, auth };