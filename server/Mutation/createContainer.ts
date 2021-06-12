import { Context } from "../index";
import { checkIsLoggedIn } from "../utils";

interface Args {}

interface NewContainer {
	_id?: string;
	owner: string;
}

const createContainer = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	const userRecord = await context.db.collection("Users").findOne({ _id: context.userId });
	const newContainer: NewContainer = {
		owner: userRecord.username
	};
	newContainer._id = (
		await context.db.collection("Containers").insertOne(newContainer)
	).insertedId;
	context.db
		.collection("Users")
		.updateOne({ _id: context.userId }, { $push: { containers: newContainer._id } });
	return newContainer;
};

export default createContainer;
