import { Context } from "../index";
import { checkIsContainerOwner } from "../utils";

interface Args {
	id: string;
}

const containerLookup = async (_: any, args: Args, context: Context, info: any) => {
	checkIsContainerOwner(context, args.id);
	const containers = await context.docker.container.list({ all: true });
	const container = containers.filter((container) => container.id === args.id)[0];
	return container.data;
};

export default containerLookup;
