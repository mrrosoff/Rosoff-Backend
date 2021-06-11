import { Context } from "../index";
import { checkIsMe } from "../utils";

interface Parent {
	_id: string;
	containers: Array<string>;
}

const containers = async (parent: Parent, args: any, context: Context, info: any) => {
	checkIsMe(parent, context);
	return context.db
		.collection("Containers")
		.find({ _id: { $in: parent.containers } })
		.toArray();
};

export default containers;
