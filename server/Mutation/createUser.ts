import { promises as fs } from "fs";

import NodeMailer from "nodemailer";

import { UserInputError } from "apollo-server-errors";
import mongodb from "mongodb";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

const { ObjectId } = mongodb;

import { generateAccessToken } from "../auth";
import { removeNullArgs } from "../db";

dotenv.config();

interface Args {
	name?: string;
	username?: string;
	avatar?: string;
	email?: string;
	password?: string;
}

interface Context {
	db: any;
	userId: string;
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
		nullArgs.password = CryptoJS.AES.encrypt(
			nullArgs.password,
			process.env.PASSWORD_KEY
		).toString();
	}
	const newUser = {
		...nullArgs,
		messages: [],
		incomingFriendRequests: [],
		outgoingFriendRequests: [],
		friends: [],
		matchInvites: [],
		matches: [],
		finishedMatches: [],
		playerStatistics: { wins: 0, losses: 0, stalemates: 0, totalGames: 0 },
		missions: [],
		finishedMissions: [],
		money: 0,
		items: [ObjectId("6091973e685ad9a5076b5ac1"), ObjectId("609197c0685ad9a5076b5ac2")]
	};
	const userId = (await context.db.collection("Users").insertOne(newUser)).insertedId;
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
		subject: "King's Corner Account Created",
		html: file
	};
	mailTransporter.sendMail(mailDetails);
	return generateAccessToken(userId.toString());
};

export default createUser;
