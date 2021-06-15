import { Context } from "../index";

interface Parent {
	Id: string;
}

const id = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Id;
};

export default id;
