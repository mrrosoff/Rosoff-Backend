import { checkIsMe } from "../utils";

const containers = async (parent, args, context, info) => {
	checkIsMe(parent, context);
	return context.db
		.collection("Containers")
		.find({ _id: { $in: parent.containers } })
		.toArray();
};

export default containers;
