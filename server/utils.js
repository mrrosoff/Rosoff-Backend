import { AuthenticationError } from "apollo-server-errors";

import mongodb from "mongodb";

const { ObjectId } = mongodb;

export const checkIsLoggedIn = async (context) => {
	if (!context.userId) {
		throw new AuthenticationError("Must Be Logged In");
	}
	if (!(await context.db.collection("Users").findOne(context.userId))) {
		throw new AuthenticationError("User Does Not Exist");
	}
};

export const checkIsMe = (parent, context) => {
	if (!context.userId || parent._id.toString() !== context.userId.toString()) {
		throw new AuthenticationError("Permissions Invalid For Requested Field");
	}
};

export const checkIsContainerOwner = async (context, containerId) => {
	const userRecord = await context.db.collection("Users").findOne(context.userId);
	const containerRecord = await context.db.collection("Containers").findOne(ObjectId(containerId));
	if (containerRecord.owner !== userRecord.username) {
		throw new AuthenticationError("Permissions Invalid For Requested Field");
	}
};
