import { Context } from "../index";
import { checkIsLoggedIn } from "../utils";

interface Args {}

interface NewContainer {
	id: string;
}

const createContainer = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	const container = await context.docker.container.create({ Image: "ubuntu" });
	context.db
		.collection("Users")
		.updateOne({ _id: context.userId }, { $push: { containers: container.id } });
	return container.data;
};

export default createContainer;
