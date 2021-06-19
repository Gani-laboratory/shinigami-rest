/* eslint-disable @typescript-eslint/no-explicit-any */
import { get } from "../services/users.service";
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
const verifyApiKey = (req: CustomRequest, res: Response, next: NextFunction): void|Response<any, Record<string, any>> => {
	const apiKey = req.headers["x-apikey"];
	if (!apiKey) return res.status(401).json({ status: res.statusCode, message: "Tidak ada x-apikey di header" });
	const data: UserDoc = storage.get(apiKey as string) as UserDoc;
	return jwt.verify(apiKey as string, process.env.API_KEY as string, async (e, decoded) => {
		if (e) return res.status(400).json({ status: res.statusCode, message: "Invalid apikey" });
		try {
			const account = data ? data : await get("email", (<any>decoded).email);
			if (!data) storage.set(apiKey as string, account);
			if ((<any>decoded).role !== account?.role) return res.status(403).json({ status: res.statusCode, message: "Dame desu yo >_<" });
			req.locals = {
				account: account,
				apikey: decoded as any
			};
			// res.append();
			next();
		} catch {
			return res.status(403).json({ status: res.statusCode, message: "api key tidak valid" });
		}
	});
};
const isLoggedIn = (req: CustomRequest, res: Response, next: NextFunction): void|Response<any, Record<string, any>> => {
	if (!req.session.user) return res.status(403).json({ status: res.statusCode, message: "anda belum login" });
	return jwt.verify(req.session.user, process.env.SESSION_KEY as string, {}, async (err, decoded) => {
		if (err) return res.status(403).json({ status: res.statusCode, message: "Hemker kah ?" });
		const user = await get("email", (decoded as any).email);
		if (!user) return res.status(404).json({ status: res.statusCode, message: "akun ini telah di hapus" });
		if (req.session.user !== jwt.sign(user.toJSON(), process.env.SESSION_KEY as string)) return res.status(403).json({ status: res.statusCode, message: "Ngehek kok ga ijin :v" });
		req.locals = {
			account: user,
			apikey: decoded as any
		};
		next();
	});
};

export { roles, isLoggedIn, verifyApiKey };