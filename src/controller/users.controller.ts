/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import userService from "../services/users.service";
import { registerValidation, editValidation } from "../middleware/user.validation";

class UsersController {
	async createUser(req: express.Request, res: express.Response) {
		const { error } = registerValidation(req.body);
		if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
		const { username, password, email } = req.body;
		const register = await userService.create(username, password, email);
		if (typeof register != "boolean") return res.status(400).json({ status: res.statusCode, ...register });
		return res.json({ status: res.statusCode, message: "Please check your email inbox" });
	}

	async editUser(req: express.Request, res: express.Response) {
		const { error } = editValidation(req.body);
		if (error) return res.status(400).json({ status: res.statusCode, message: error.details[0].message });
		const { username, password, email } = req.body;
		const register = await userService.create(username, password, email);
		if (typeof register != "boolean") return res.status(400).json({ status: res.statusCode, ...register });
		return res.json({ status: res.statusCode, message: "Please check your email inbox" });
	}

	async getUser(req: express.Request, res: express.Response) {
		try {
			const { userId } = req.params;
			const user = await userService.getById(userId);
			return res.json(user);
		} catch (e) {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}

	async showUser(req: express.Request, res: express.Response) {
		const users = await userService.showAll();
		return res.json({ status: res.statusCode, users });
	}

	async deleteUser(req: express.Request, res: express.Response) {
		const { userId } = req.params;
		return res.json({ status: res.statusCode, data: await userService.destroy(userId) });
	}
}

export default new UsersController();