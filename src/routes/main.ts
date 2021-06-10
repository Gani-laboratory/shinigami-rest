import { UsersRoutes } from "./users";
import { RoutesConfig } from "../config/routes.config";
import { Application } from "express";

export default (app: Application): Array<RoutesConfig> => {
	const routes: Array<RoutesConfig> = [];
	routes.push(
		new UsersRoutes(app)
	);
	return routes;
};