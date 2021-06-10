import { UsersRoutes } from "./users";
import { AuthRoutes } from "./auth";
import { RoutesConfig } from "../config/routes.config";
import { Application } from "express";

export default (app: Application): Array<RoutesConfig> => {
	const routes: Array<RoutesConfig> = [];
	routes.push(
		new UsersRoutes(app),
		new AuthRoutes(app)
	);
	return routes;
};