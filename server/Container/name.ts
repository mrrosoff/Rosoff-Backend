import { Context } from "../index";

interface Parent {
	Name: string;
}

const name = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Name;
};

export default name;
