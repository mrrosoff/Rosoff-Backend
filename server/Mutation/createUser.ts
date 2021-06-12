import { promises as fs } from "fs";

import NodeMailer from "nodemailer";

import { UserInputError } from "apollo-server-errors";
import mongodb from "mongodb";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

import { Context } from "../index";
import { generateAccessToken } from "../auth";
import { removeNullArgs } from "../utils";

dotenv.config();

interface Args {
	name?: string;
	username?: string;
	avatar?: string;
	email?: string;
	password?: string;
}

const createUser = async (_: any, args: Args, context: Context, info: any) => {
	const nullArgs: Args = removeNullArgs(args);
	const userRecord = await context.db.collection("Users").findOne({ email: nullArgs.email });
	if (userRecord) {
		throw new UserInputError("User Already Exists");
	}
	if (nullArgs.username) {
		if (nullArgs.username.length > 12) {
			throw new UserInputError("Username Longer Than 12 Characters");
		}
		const userRecord = await context.db
			.collection("Users")
			.findOne({ username: nullArgs.username });
		if (userRecord) {
			throw new UserInputError("User Already Exists");
		}
	}
	if (nullArgs.password) {
		if (!process.env.PASSWORD_KEY) {
			throw Error("PASSWORD_KEY Is Not Defined");
		}
		nullArgs.password = CryptoJS.AES.encrypt(
			nullArgs.password,
			process.env.PASSWORD_KEY
		).toString();
	}
	const newUser = {
		...nullArgs,
		containers: []
	};
	const userId = (await context.db.collection("Users").insertOne(newUser)).insertedId;
	if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
		throw Error("Must Define MAIL_USERNAME and MAIL_PASSWORD");
	}
	const mailTransporter: any = NodeMailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.MAIL_USERNAME,
			pass: process.env.MAIL_PASSWORD
		}
	});

	let file;
	if (process.env.NODE_ENV === "development") {
		file = await fs.readFile(__dirname + "/../client/static/email/accountCreated.html");
	} else {
		file = await fs.readFile(__dirname + "/website/email/accountCreated.html");
	}
	const mailDetails = {
		from: process.env.MAIL_USERMAME,
		to: nullArgs.email,
		subject: "Rosoff Dev Account Created",
		html: file
	};
	mailTransporter.sendMail(mailDetails);
	return generateAccessToken(userId.toString());
};

export default createUser;
