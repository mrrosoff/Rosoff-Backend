import CryptoJS from "crypto-js";

import { UserInputError } from "apollo-server-errors";
import dotenv from "dotenv";

import { Context } from "../index";
import { checkIsLoggedIn, removeNullArgs } from "../utils";

dotenv.config();

interface Args {
	name?: string;
	username?: string;
	avatar?: string;
	email?: string;
	password?: string;
}

const editUser = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	const nullArgs: Args = removeNullArgs(args);
	if (nullArgs.email) {
		const userRecord = await context.db.collection("Users").findOne({ email: nullArgs.email });
		if (userRecord) {
			throw new UserInputError("User Already Exists");
		}
	}
	if (nullArgs.username) {
		if (nullArgs.username.length > 12) {
			throw new UserInputError("Username Longer Than 12 Characters");
		}
		const userRecord = await context.db
			.collection("Users")
			.findOne({ username: args.username });
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
	const modifiedUser = await context.db
		.collection("Users")
		.findOneAndUpdate({ _id: context.userId }, { $set: nullArgs }, { returnDocument: "after" });
	return modifiedUser.value;
};

export default editUser;
