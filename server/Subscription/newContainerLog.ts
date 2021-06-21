import { Context } from "../index";

interface Args {
	id: string;
}

const newMessage = {
	resolve: (parent, args, context, info) => {
		return parent.toString();
	},
	subscribe: async (_: any, args: Args, context: Context, info: any) => {
		const container = context.docker.getContainer(args.id);
		const stream = await container.logs({ follow: true, stdout: true, stderr: true });
		return stream;
	}
};

export default newMessage;
