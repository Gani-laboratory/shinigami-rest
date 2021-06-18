import { RoutesConfig } from "../config/routes.config";
import { Application } from "express";
import cb from "../controller/auth.controller";

export class AuthRoutes extends RoutesConfig {
	constructor(app: Application) {
		super(app, "UsersRoutes");
	}
	handler(): Application {
		this.app.get("/verify/:token", cb.verifyToken);
		this.app.post("/login", cb.login);

		return this.app;
	}
}