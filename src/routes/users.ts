import { RoutesConfig } from "../config/routes.config";
import { Application } from "express";
import cb from "../controller/users.controller";

export class UsersRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, "UsersRoutes");
	}
	handler(): Application {
		this.app.route("/users")
			.get(cb.showUser)
			.post(cb.createUser);
			
		this.app.route("/users/:userId")
			.get(cb.getUser)
			.patch(cb.editUser)
			.delete(cb.deleteUser);

		return this.app;
	}
}