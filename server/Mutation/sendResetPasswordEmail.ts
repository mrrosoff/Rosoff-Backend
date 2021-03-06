import { promises as fs } from "fs";

import NodeMailer from "nodemailer";
import handlebars from "handlebars";

import dotenv from "dotenv";

import { Context } from "../index";
import { generateAccessToken } from "../auth";
import { removeNullArgs } from "../utils";

dotenv.config();

interface Args {
	email?: string;
	username: string;
}

const sendResetPasswordEmail = async (_: any, args: Args, context: Context, info: any) => {
	const userRecord = await context.db.collection("Users").findOne(removeNullArgs(args));
	if (!userRecord) return false;
	let mailTransporter = NodeMailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD
		}
	});
	let file, link;
	if (process.env.NODE_ENV === "development") {
		file = await fs.readFile(__dirname + "/../client/static/email/forgotEmail.html");
		link = "http://localhost:3000/forgot-password/?id=";
	} else {
		file = await fs.readFile(__dirname + "/website/email/forgotEmail.html");
		link = "https://kings-corner.games/forgot-password/?id=";
	}
	const template = handlebars.compile(file.toString());
	const replacements = {
		username: userRecord.username,
		resetLink: link + generateAccessToken(userRecord._id)
	};
	const htmlToSend = template(replacements);
	const mailDetails = {
		from: process.env.MAIL_USERMAME,
		to: userRecord.email,
		subject: "Rosoff Dev Password Reset",
		html: htmlToSend
	};
	mailTransporter.sendMail(mailDetails);
	return true;
};

export default sendResetPasswordEmail;
