import { Context } from "../index";

interface Parent {
	Created: string;
}

const created = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Created;
};

export default created;
