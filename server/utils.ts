import { AuthenticationError } from "apollo-server-errors";

import mongodb from "mongodb";

const { ObjectId } = mongodb;

interface Context {
	userId: String;
	db: any;
}

export const checkIsLoggedIn = async (context: Context) => {
	if (!context.userId) {
		throw new AuthenticationError("Must Be Logged In");
	}
	if (!(await context.db.collection("Users").findOne(context.userId))) {
		throw new AuthenticationError("User Does Not Exist");
	}
};

export const checkIsMe = (parent: any, context: Context) => {
	if (!context.userId || parent._id.toString() !== context.userId.toString()) {
		throw new AuthenticationError("Permissions Invalid For Requested Field");
	}
};

export const checkIsContainerOwner = async (context: Context, containerId: string) => {
	const userRecord: any = await context.db.collection("Users").findOne(context.userId);
	const containerRecord: any = await context.db
		.collection("Containers")
		.findOne(new ObjectId(containerId));
	if (containerRecord.owner !== userRecord.username) {
		throw new AuthenticationError("Permissions Invalid For Requested Field");
	}
};
