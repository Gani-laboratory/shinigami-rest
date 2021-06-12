/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";
import { registerValidation, editValidation } from "../validation/user.validation";

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
}

export default new UsersMiddleware();