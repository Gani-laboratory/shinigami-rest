import { RoutesConfig } from "../config/routes.config";
import { Application } from "express";
import cb from "../controller/auth.controller";

export class AuthRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, "UsersRoutes");
	}
	handler(): Application {
		this.app.route("/verify/:token")
			.get(cb.verifyToken);

		return this.app;
	}
}