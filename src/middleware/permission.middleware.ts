/* eslint-disable @typescript-eslint/no-explicit-any */
import { getByEmail } from "../services/users.service";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../interface/request.interface";

enum roles {
    owner = 1,
    admin,
    member
}
const auth = (req: CustomRequest, res: Response, next: NextFunction): void|Response<any, Record<string, any>> => {
	const apiKey = req.headers["x-apikey"];
	if (!apiKey) return res.status(401).json({ status: res.statusCode, message: "Missing x-apikey in header" });
	return jwt.verify(apiKey as string, process.env.SECRET as string, async (e, decoded) => {
		if (e) return res.status(400).json({ status: res.statusCode, message: "Invalid apikey" });
		try {
			const account = await getByEmail((<any>decoded).email);
			if ((<any>decoded).role !== account?.role) return res.status(403).json({ status: res.statusCode, message: "Dame desu yo >_<" });
			req.locals = {
				account: account,
				apikey: decoded as any
			};
			next();
		} catch {
			return res.status(403).json({ status: res.statusCode, message: "Invalid Api Key" });
		}
	});
};

export { roles, auth };