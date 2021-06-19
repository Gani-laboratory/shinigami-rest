/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "../services/users.service";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../interface/request.interface";
import { UserDoc } from "interface/mongoose.interface";
import { decodeSession, decodeApikey, storage } from "../util/simple";

enum roles {
    owner = 1,
    admin,
    member
}
const verifyApiKey = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>> => {
	const apiKey = req.headers["x-apikey"];
	if (!apiKey) return res.status(401).json({ status: res.statusCode, message: "Tidak ada x-apikey di header" });
	try {
		const decoded = decodeApikey(apiKey as string);
		const data: UserDoc = storage.get(apiKey as string) as UserDoc;
		const account = data ? data : await get("email", (<any>decoded).email);
		if (!data) storage.set(apiKey as string, account);
		if (apiKey !== account?.apiKey) return res.status(403).json({ status: res.statusCode, message: "apikey tidak valid" });
		next();
	} catch  {
		return res.status(400).json({ status: res.statusCode, message: "apikey tidak valid" });
	}
};
const isLoggedIn = (req: CustomRequest, res: Response, next: NextFunction): void|Response<any, Record<string, any>> => {
	try {
		if (!req.session.user) return res.status(403).json({ status: res.statusCode, message: "anda belum login" });
		req.locals = {
			account: decodeSession(req.session.user) as UserDoc,
		};
		next();
	} catch {
		res.status(403).json({ status: res.statusCode, message: "Hemker kah ?" });	
	}
};

export { roles, isLoggedIn, verifyApiKey };