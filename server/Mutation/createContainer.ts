import { Context } from "../index";
import { checkIsLoggedIn } from "../utils";

interface Args {}

interface NewContainer {
	id: string;
}

const createContainer = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	const containerId = (await context.docker.container.create({ Image: "ubuntu" })).id;
	const newContainer: NewContainer = {
		id: containerId
	};
	context.db
		.collection("Users")
		.updateOne({ _id: context.userId }, { $push: { containers: newContainer.id } });
	return newContainer;
};

export default createContainer;
