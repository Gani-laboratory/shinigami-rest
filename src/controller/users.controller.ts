/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import userService from "../services/users.service";
import { registerValidation, editValidation } from "../middleware/user.validation";

class UsersController {
	async createUser(req: Request, res: Response) {
		const { error } = registerValidation(req.body);
		if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
		const { username, password, email } = req.body;
		const register = await userService.create(username, password, email);
		if (typeof register != "boolean") return res.status(400).json({ status: res.statusCode, ...register });
		return res.json({ status: res.statusCode, message: "Please check your email inbox" });
	}

	async editUser(req: Request, res: Response) {
		try {
			const { error } = editValidation(req.body);
			if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
			const { username, password, email } = req.body;
			const edit = await userService.edit("_id", req.params.userId, JSON.parse(JSON.stringify({ username, password, email })));
			if (!edit) return res.status(400).json({ status: res.statusCode, message: `user with id ${req.params.userId} not found` });
			return res.json({ status: res.statusCode, ...edit, koe: "oke" });
		} catch {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const { userId } = req.params;
			const user = await userService.getById(userId);
			return res.json(user);
		} catch (e) {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}

	async showUser(req: Request, res: Response) {
		const users = await userService.showAll();
		return res.json({ status: res.statusCode, users });
	}

	async deleteUser(req: Request, res: Response) {
		const { userId } = req.params;
		return res.json({ status: res.statusCode, data: await userService.destroy(userId) });
	}
}

export default new UsersController();