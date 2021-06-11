import { Context } from "../index";
import { checkIsLoggedIn } from "../utils";

interface NewContainer {
	_id?: string;
	owner: string;
}

const createMatch = async (_: any, args: any, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	const userRecord = await context.db.collection("Users").findOne({ _id: context.userId });
	const newContainer: NewContainer = {
		owner: userRecord.username
	};
	newContainer._id = (await context.db.collection("Matches").insertOne(newContainer)).insertedId;
	context.db
		.collection("Users")
		.updateOne({ _id: context.userId }, { $push: { matches: newContainer._id } });
	return newContainer;
};

export default createMatch;
