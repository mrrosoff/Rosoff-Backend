import { Context } from "../index";

interface Parent {
	Command: string;
}

const command = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Command;
};

export default command;
