/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { create, edit, get, showAll, destroy } from "../services/users.service";
import jwt from "jsonwebtoken";

class UsersController {
	async createUser(req: Request, res: Response) {
		const { username, password, email } = req.body;
		const register = await create(username, password, email);
		if (typeof register != "boolean") return res.status(400).json({ status: res.statusCode, ...register });
		return res.status(201).json({ status: res.statusCode, message: "Please check your email inbox" });
	}

	async editUser(req: Request, res: Response) {
		try {
			const { username, password, email } = req.body;
			const { id } = req.params;
			const editUser = await edit("_id", id, JSON.parse(JSON.stringify({ username, password, email })));
			if (!editUser) return res.status(400).json({ status: res.statusCode, message: `user with id ${id} not found` });
			req.session.user = jwt.sign(editUser.toJSON(), process.env.SESSION_KEY as string);
			return req.session.save(e => {
				if (e) return res.status(500).json({ status: res.statusCode, message: "Oops, ada kesalahan diserver" });
				return res.json({ status: res.statusCode, message: `Success edit user with id ${id}` });
			});
		} catch {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}

	async getUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await get("_id", id);
			return res.json(user);
		} catch {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}

	async showUser(req: Request, res: Response) {
		const users = await showAll();
		return res.json({ status: res.statusCode, users });
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const user = await destroy(id);
			return req.session.destroy(e => {
				if (e) return res.status(500).json({ status: res.statusCode, message: "Oops, ada kesalahan diserver" });
				return user.deletedCount ? res.json({ status: res.statusCode, message: `Success delete user with id ${id}` }) : res.status(404).json({ status: res.statusCode, message: `User with id ${id} has been deleted` });
			});
		} catch {
			return res.status(400).json({ status: res.statusCode, message: "Invalid id" });	
		}
	}
}

export default new UsersController();