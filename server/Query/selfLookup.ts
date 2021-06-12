import { Context } from "../index";

interface Args {}

const selfLookup = (_: any, args: Args, context: Context, info: any) => {
	if (!context.userId) return null;
	return context.db.collection("Users").findOne({ _id: context.userId });
};

export default selfLookup;
