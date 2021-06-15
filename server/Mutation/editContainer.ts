import { UserInputError } from "apollo-server-errors";

import mongodb from "mongodb";

import { Context } from "../index";
import { checkIsLoggedIn, checkIsContainerOwner, removeNullArgs } from "../utils";

const { ObjectId } = mongodb;

interface Args {
	id: string;
	name?: string;
}

const editContainer = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	await checkIsContainerOwner(context, args.id);

	const nullArgs: any = removeNullArgs(args);
	if (nullArgs.name) {
		if (nullArgs.name.length > 20) {
			throw new UserInputError("Container Name Is Longer Than 20 Characters");
		}
	}

	const modifiedContainer = await context.db
		.collection("Containers")
		.findOneAndUpdate(
			{ _id: new ObjectId(args.id) },
			{ $set: nullArgs },
			{ returnDocument: "after" }
		);
	return modifiedContainer.value;
};

export default editContainer;
