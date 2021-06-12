import { OAuth2Client } from "google-auth-library";

import dotenv from "dotenv";

import { Context } from "../index";
import { generateAccessToken } from "../auth";
import createUser from "./createUser";

dotenv.config();

interface Args {
	token: string;
}

const googleLogin = async (_: any, args: Args, context: Context, info: any) => {
	const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
	const ticket = await client.verifyIdToken({
		idToken: args.token,
		audience: process.env.GOOGLE_CLIENT_ID
	});
	const tokenPayload = ticket.getPayload();
	if (!tokenPayload) {
		return null;
	}
	const userRecord = await context.db.collection("Users").findOne({ email: tokenPayload.email });
	if (userRecord) {
		return {
			token: generateAccessToken(userRecord._id.toString()),
			redirectPath: userRecord.username ? "/app" : "/finalize-account"
		};
	}
	return {
		token: await createUser(
			undefined,
			{ email: tokenPayload.email, name: tokenPayload.name, avatar: tokenPayload.picture },
			context,
			undefined
		),
		redirectPath: "/finalize-account"
	};
};

export default googleLogin;
