import { UserInputError } from "apollo-server-express";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

import { Context } from "../index";
import { generateAccessToken } from "../auth";
import { removeNullArgs } from "../utils";

dotenv.config();

interface Args {
	email?: string;
	username?: string;
	password: string;
}

const loginUser = async (_: any, args: Args, context: Context, info: any) => {
	const { email, username, password } = args;
	const userRecord = await context.db
		.collection("Users")
		.findOne(removeNullArgs({ email, username }));
	if (!process.env.PASSWORD_KEY) {
		throw Error("PASSWORD_KEY Is Not Defined");
	}
	const bytes = CryptoJS.AES.decrypt(userRecord.password, process.env.PASSWORD_KEY);
	const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
	if (!userRecord || decryptedPassword !== password) {
		throw new UserInputError("Incorrect Username or Password");
	}
	return generateAccessToken(userRecord._id.toString());
};

export default loginUser;
