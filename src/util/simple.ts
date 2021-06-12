import nodemailer from "nodemailer";

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

export { sendMail };