import { Context } from "../index";
import { checkIsLoggedIn, checkIsContainerOwner } from "../utils";

interface Args {
	id: string;
}

const deleteContainer = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	await checkIsContainerOwner(context, args.id);
	const container = context.docker.getContainer(args.id);
	container.delete({ force: true });
	context.db
		.collection("Users")
		.updateOne({ _id: context.userId }, { $pull: { containers: container.id } });
	return container.inspect();
};

export default deleteContainer;
