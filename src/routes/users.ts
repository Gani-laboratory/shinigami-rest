import { RoutesConfig } from "../config/routes.config";
import { Application } from "express";
import cb from "../controller/users.controller";
import middleware from "../middleware/user.middleware";

export class UsersRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, "UsersRoutes");
	}
	handler(): Application {
		this.app.route("/users")
			.get(cb.showUser)
			.post(middleware.post, cb.createUser);
			
		this.app.route("/users/:id")
			.get(cb.getUser)
			.patch(middleware.patch, cb.editUser)
			.delete(cb.deleteUser);

		return this.app;
	}
}