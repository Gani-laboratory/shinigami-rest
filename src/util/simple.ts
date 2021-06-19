/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";
import jwt from "jsonwebtoken";

const decodeApikey = (token: string) => {
	return jwt.verify(token, process.env.API_KEY as string);
};

const decodeSession = (token: string) => {
	return jwt.verify(token, process.env.SESSION_KEY as string);
};

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "bindakun2nd@gmail.com",
		pass: "yhgamer123"
	},
});

async function sendMail(email: string, token: string): Promise<void>
{
	const url = `${process.env.BASE_URL}${process.env.DEBUG ? `:${process.env.PORT}` : ""}`;
	await transport.sendMail({
		from: `Shinoa REST API <support@${process.env.APP_NAME}>`,
		to: email,
		subject: "Shinoa REST API Verification",
		html: `Please verify yourself by clicking <a href="${url}/verify/${token}">this link</a>`
	});
}

const myCustomMiddleware = function(middleware: any, mode: "unless"|"onlyFor", ...paths: string[]) {
	return function(req: Request, res: Response, next: NextFunction): void {
	  	const pathCheck = paths.some(path => path.split(" ")[0] === req.method && new RegExp(path.split(" ")[1].replace(/\//g, "\\/").replace(/\*/g, "(.+)")).test(req.path));
	  	if (mode === "unless") pathCheck ? next() : middleware(req, res, next);
		else pathCheck ? middleware(req, res, next) : next();
	};
};

const storage = new NodeCache({
	stdTTL: 3600,
	checkperiod: 120,
	useClones: false
});

export { sendMail, myCustomMiddleware, decodeApikey, decodeSession, storage };