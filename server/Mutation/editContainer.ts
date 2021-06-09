import { UserInputError } from "apollo-server-errors";

import mongodb from "mongodb";

import { checkIsLoggedIn, checkIsContainerOwner } from "../utils";
import { removeNullArgs } from "../db";

const { ObjectId } = mongodb;

interface Args {
	containerId: string;
	name?: string;
}

const editContainer = async (_, args: Args, context, info) => {
	await checkIsLoggedIn(context);
	await checkIsContainerOwner(context, args.containerId);

	const nullArgs: any = removeNullArgs(args);
	if (nullArgs.name) {
		if (nullArgs.name.length > 20) {
			throw new UserInputError("Container Name Is Longer Than 20 Characters");
		}
	}

	const modifiedContainer = await context.db
		.collection("Matches")
		.findOneAndUpdate(
			{ _id: ObjectId(args.containerId) },
			{ $set: nullArgs },
			{ returnDocument: "after" }
		);
	return modifiedContainer.value;
};

export default editContainer;
