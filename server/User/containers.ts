import { checkIsMe } from "../utils";

const containers = async (parent: any, args: any, context: any, info: any) => {
	checkIsMe(parent, context);
	return context.db
		.collection("Containers")
		.find({ _id: { $in: parent.containers } })
		.toArray();
};

export default containers;
