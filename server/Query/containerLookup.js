import mongodb from "mongodb";
import { checkIsContainerOwner } from "../utils.js";

const { ObjectId } = mongodb;

const containerLookup = (_, args, context, info) => {
	checkIsContainerOwner(context, args._id);
	return context.db.collection("Containers").findOne({ _id: ObjectId(args._id) });
};

export default containerLookup;