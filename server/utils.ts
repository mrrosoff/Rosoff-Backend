import { AuthenticationError } from "apollo-server-errors";

import mongodb from "mongodb";

import { Context } from "./index";

interface Parent {
	_id: string;
}

export const checkIsMe = (parent: Parent, context: Context): void => {
	if (!context.userId || parent._id.toString() !== context.userId.toString()) {
		throw new AuthenticationError("Permissions Invalid For Requested Field");
	}
};

export const checkIsContainerOwner = async (
	context: Context,
	containerId: string
): Promise<void> => {
	const userRecord: any = await context.db.collection("Users").findOne({ id: context.userId });
	const containerRecord: any = await context.db
		.collection("Containers")
		.findOne(new mongodb.ObjectId(containerId));
	if (containerRecord.owner !== userRecord.username) {
		throw new AuthenticationError("Permissions Invalid For Requested Field");
	}
};

export const checkIsLoggedIn = async (context: Context): Promise<void> => {
	if (!context.userId) {
		throw new AuthenticationError("Must Be Logged In");
	}
	if (!(await context.db.collection("Users").findOne({ _id: context.userId }))) {
		throw new AuthenticationError("User Does Not Exist");
	}
};

export const removeNullArgs = (args: any): any => {
	return Object.fromEntries(Object.entries(args).filter(([_, v]) => v != null));
};
