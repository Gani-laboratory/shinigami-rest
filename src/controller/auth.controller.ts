/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { verify, get } from "../services/users.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
	async verifyToken(req: Request, res: Response) {
		const { token } = req.params;
		jwt.verify(token, process.env.API_KEY as string, {}, async (err, decode) => {
			if (err) return res.status(400).json({ status: res.statusCode, message: "invalid token" });
			const message = await verify((<any>decode).email, token);
			if (typeof message === "string") return res.status(400).json({ status: res.statusCode, message });
			return res.json({ status: res.statusCode, message: "Your email has verified, please login!" });
		});
	}
	async login(req: Request, res: Response) {
		try {
			const { name, password } = req.body;
			const account = await get("username", name) || await get("email", name);
			if (!account) return res.status(400).json({ status: res.statusCode, message: "this account is not registered" });
			return bcrypt.compare(password, account.password, (_, same) => {
				if (!same) return res.status(400).json({ status: res.statusCode, message: "wrong password" });
				req.session.user = jwt.sign(account.toJSON(), process.env.SESSION_KEY as string);
				return res.json({ status: res.statusCode, message: "login successfully" });
			});
		} catch {
			return res.status(500).json({ status: res.statusCode });	
		}
	}
}

export default new AuthController();