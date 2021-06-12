import mongodb from "mongodb";

import { Context } from "../index";
import { checkIsLoggedIn, checkIsContainerOwner } from "../utils";

const { ObjectId } = mongodb;

interface Args {
	_id: string
}

const deleteContainer = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	await checkIsContainerOwner(context, args._id);
	context.db.collection("Container").deleteOne({ _id: new ObjectId(args._id) });
	context.pubsub.publish("DELETED_CONTAINER", { _id: args._id });
	return true;
};

export default deleteContainer;
