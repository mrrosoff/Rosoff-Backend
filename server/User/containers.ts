import { Context } from "../index";
import { checkIsMe } from "../utils";

interface Parent {
	_id: string;
	containers: Array<string>;
}

const containers = (parent: Parent, args: any, context: Context, info: any) => {
	checkIsMe(parent, context);
	return parent.containers.map((containerId) =>
		context.docker.getContainer(containerId).inspect()
	);
};

export default containers;
