import { Context } from "../index";

interface Parent {
	Names: Array<string>;
}

const names = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Names;
};

export default names;
