import { Context } from "../index";

interface Parent {
	Status: string;
}

const status = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Status;
};

export default status;
