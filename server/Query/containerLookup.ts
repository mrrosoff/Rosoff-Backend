import mongodb from "mongodb";
import { checkIsContainerOwner } from "../utils";

const { ObjectId } = mongodb;

const containerLookup = (_: any, args: any, context: any, info: any) => {
	checkIsContainerOwner(context, args._id);
	return context.db.collection("Containers").findOne({ _id: new ObjectId(args._id) });
};

export default containerLookup;
