/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import userService from "../services/users.service";

class UsersController {
	async createUser(req: Request, res: Response) {
		const { username, password, email } = req.body;
		const register = await userService.create(username, password, email);
		if (typeof register != "boolean") return res.status(400).json({ status: res.statusCode, ...register });
		return res.json({ status: res.statusCode, message: "Please check your email inbox" });
	}

	async editUser(req: Request, res: Response) {
		try {
			const { username, password, email } = req.body;
			const { id } = req.params;
			const edit = await userService.edit("_id", id, JSON.parse(JSON.stringify({ username, password, email })));
			if (!edit) return res.status(400).json({ status: res.statusCode, message: `user with id ${id} not found` });
			return res.json({ status: res.statusCode, message: `Success edit user with id ${id}` });
		} catch {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await userService.getById(id);
			return res.json(user);
		} catch {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}

	async showUser(req: Request, res: Response) {
		const users = await userService.showAll();
		return res.json({ status: res.statusCode, users });
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			await userService.destroy(id);
			return res.json({ status: res.statusCode, message: `Success delete user with id ${id}` });
		} catch {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}
}

export default new UsersController();