import { Context } from "../index";

interface Parent {
	Mounts: Array<string>;
}

const mounts = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Mounts;
};

export default mounts;
