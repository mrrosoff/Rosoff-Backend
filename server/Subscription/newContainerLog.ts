import { withFilter } from "apollo-server-express";

import { Context } from "../index";

interface Payload {
	_id: string;
	message: string;
}

const newMessage = {
	resolve: (payload: Payload, args: any, context: Context) => {
		return payload.message;
	},
	subscribe: withFilter(
		(_: any, args: any, context: Context, info: any) =>
			context.pubsub.asyncIterator("NEW_MESSAGE"),
		(payload: Payload, args: any, context: Context, info: any) => {
			return payload._id.toString() === context.userId.toString();
		}
	)
};

export default newMessage;
