import { Context } from "../index";

const selfLookup = (_: any, args: any, context: Context, info: any) => {
	if (!context.userId) return null;
	return context.db.collection("Users").findOne({ _id: context.userId });
};

export default selfLookup;
