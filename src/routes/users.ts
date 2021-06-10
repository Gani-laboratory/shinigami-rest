import { RoutesConfig } from "../config/routes.config";
import express from "express";
import cb from "../controller/users.controller";

export class UsersRoutes extends RoutesConfig {
	constructor(app: express.Application) {
		super(app, "UsersRoutes");
	}
	handler(): express.Application {
		this.app.route("/users")
			.get(cb.showUser)
			.post(cb.createUser);
			
		this.app.route("/users/:userId")
			.all((req: express.Request, res: express.Response, next: express.NextFunction) => {
				next();
			})
			.get(cb.getUser)
			.patch(cb.editUser)
			.delete(cb.deleteUser);

		return this.app;
	}
}