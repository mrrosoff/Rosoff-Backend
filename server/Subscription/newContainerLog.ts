import { withFilter } from "apollo-server-express";

const newMessage = {
	resolve: (payload: any, args: any, context: any) => {
		return payload.message;
	},
	subscribe: withFilter(
		(_: any, args: any, context: any, info: any) => context.pubsub.asyncIterator("NEW_MESSAGE"),
		(payload, args, context, info) => {
			return payload._id.toString() === context.userId.toString();
		}
	)
};

export default newMessage;