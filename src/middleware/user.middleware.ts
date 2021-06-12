/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { registerValidation, editValidation } from "../validation/user.validation";
import { roles } from "./permission.middleware";
import jwt from "jsonwebtoken";

class UsersMiddleware {
	async post(req: Request, res: Response, next: NextFunction) {
		const { error } = registerValidation(req.body);
		if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
		next();
	}
    
	async patch(req: Request, res: Response, next: NextFunction) {
		const { error } = editValidation(req.body);
		if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
		next();
	}
	permission(flags: roles) {
		return (req: Request, res: Response, next: NextFunction) => {
			const apiKey = req.headers["x-apikey"];
			if (!apiKey) return res.status(401).json({ status: res.statusCode, message: "Missing x-apikey in header" });
			return jwt.verify(apiKey as string, process.env.SECRET as string, (e, decoded) => {
				if (e) return res.status(400).json({ status: res.statusCode, message: "Invalid apikey" });
				const role = parseInt((<any>decoded).role);
				if ((role === roles.member && flags !== roles.member) || (role === roles.admin && flags === roles.owner)) return res.status(403).json({ status: res.statusCode, message: "You dont have access to this page" });
				next();
			});
		};
	}
}

export default new UsersMiddleware();