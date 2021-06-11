import mongodb from "mongodb";

import { Context } from "../index";
import { checkIsLoggedIn, checkIsContainerOwner } from "../utils";

const { ObjectId } = mongodb;

const deleteMatch = async (_: any, args: any, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	await checkIsContainerOwner(context, args.containerId);

	await context.db.collection("Matches").deleteOne({ _id: new ObjectId(args.containerId) });
	context.pubsub.publish("DELETED_MATCH", {
		containerId: args.containerId
	});
	return true;
};

export default deleteMatch;
