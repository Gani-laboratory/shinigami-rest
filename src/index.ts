import { config } from "dotenv";
config();

import express from "express";
import http from "http";
import winston from "winston";
import expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import routes from "./routes/main";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = process.env.PORT || 3000;
const debugLog: debug.IDebugger = debug("app");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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