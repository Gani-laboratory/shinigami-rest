import { config } from "dotenv";
config();

import express from "express";
import http from "http";
import winston from "winston";
import expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import MongoStore from "connect-mongo";
import session from "express-session";
import routes from "./routes/main";
import { unless } from "./util/simple";
import { auth } from "./middleware/permission.middleware";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;
const debugLog: debug.IDebugger = debug("app");

app.use(express.json(), express.urlencoded({ extended: true }), cors(), session({
	secret: process.env.SESSION_KEY as string,
	store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}), unless(auth, "GET /verify", "POST /users", "POST /login"));

const loggerOptions: expressWinston.LoggerOptions = {
	transports: [new winston.transports.Console()],
	format: winston.format.combine(
		winston.format.json(),
		winston.format.prettyPrint(),
		winston.format.colorize({ all: true })
	),
};

if (!process.env.DEBUG) {
	loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

const runningMessage = `Server running at http://${"0.0.0.0"}:${port}`;
app.get("/", (req: express.Request, res: express.Response) => {
	res.status(200).send(runningMessage);
});
routes(app).forEach((route) => {
	debugLog(`Routes configured for ${route.getName()}`);
});

server.listen(port, () => {
	console.log(runningMessage);
});