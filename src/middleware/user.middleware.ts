/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { editValidation } from "../validation/user.validation";
import { roles } from "./permission.middleware";
import { CustomRequest } from "../interface/request.interface";
import { UserDoc } from "interface/mongoose.interface";
import { registerValidation } from "validation/auth.validation";

class UsersMiddleware {
	post(req: Request, res: Response, next: NextFunction) {
		const { error } = registerValidation(req.body);
		if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
		next();
	}
    
	patch(req: Request, res: Response, next: NextFunction) {
		const { error } = editValidation(req.body);
		if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
		next();
	}
	permission(flags: roles) {
		return (req: Request, res: Response, next: NextFunction) => {
			const role = ((req as CustomRequest).locals.account as UserDoc).role;
			if ((role === roles.member && flags !== roles.member) || (role === roles.admin && flags === roles.owner)) return res.status(403).json({ status: res.statusCode, message: "You dont have access to this page" });
			next();
		};
	}
}

export default new UsersMiddleware();