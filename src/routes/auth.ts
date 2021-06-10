import { RoutesConfig } from "../config/routes.config";
import express from "express";
import cb from "../controller/auth.controller";

export class UsersRoutes extends RoutesConfig {
	constructor(app: express.Application) {
		super(app, "UsersRoutes");
	}
	handler(): express.Application {
		this.app.route("/verify/:token")
			.get(cb.verifyToken);

		return this.app;
	}
}