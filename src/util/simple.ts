import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "bindakun2nd@gmail.com",
		pass: "yhgamer123"
	},
	debug: true,
	logger: true
});
// const transport = nodemailer.createTransport({
// 	host: "smtp.zoho.com",
// 	port: 465,
// 	secure: true,
// 	auth: {
// 		user: "support@hanifdwyputra.xyz",
// 		pass: "Rasca11|"
// 	},
// 	debug: true,
// 	logger: true
// });

async function sendMail(email: string, token: string): Promise<void>
{
	await transport.sendMail({
		from: "Shinoa REST API <support@hanifdwyputra.xyz>",
		to: email,
		subject: "Shinoa REST API Verification",
		html: `Please verify yourself by clicking <a href="https://shinigami-rest.herokuapp.com/verify/${token}">this link</a>`
	});
}

export { sendMail };