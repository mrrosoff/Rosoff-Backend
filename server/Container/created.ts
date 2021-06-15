import { Context } from "../index";

interface Parent {
	Created: number;
}

const created = async (parent: Parent, args: any, context: Context, info: any) => {
	return new Date(parent.Created);
};

export default created;
