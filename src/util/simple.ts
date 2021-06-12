/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";

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

const unless = function(middleware: any, ...paths: string[]) {
	return function(req: Request, res: Response, next: NextFunction): void {
	  const pathCheck = paths.some(path => path === req.path);
	  pathCheck ? next() : middleware(req, res, next);
	};
};

export { sendMail, unless };