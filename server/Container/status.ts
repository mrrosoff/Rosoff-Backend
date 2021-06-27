import { Context } from "../index";

interface Parent {
	State: {
		Status: string;
	};
}

const status = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.State.Status.toUpperCase();
};

export default status;
