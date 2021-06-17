import { Context } from "../index";
import { checkIsContainerOwner } from "../utils";

interface Args {
	id: string;
}

const containerLookup = async (_: any, args: Args, context: Context, info: any) => {
	checkIsContainerOwner(context, args.id);
	return context.docker.getContainer(args.id).inspect();
};

export default containerLookup;
