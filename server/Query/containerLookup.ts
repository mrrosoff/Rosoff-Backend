import mongodb from "mongodb";

import { Context } from "../index";
import { checkIsContainerOwner } from "../utils";

const { ObjectId } = mongodb;

interface Args {
	_id: string;
}

const containerLookup = (_: any, args: Args, context: Context, info: any) => {
	checkIsContainerOwner(context, args._id);
	return context.db.collection("Containers").findOne({ _id: new ObjectId(args._id) });
};

export default containerLookup;
