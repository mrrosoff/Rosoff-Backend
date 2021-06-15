import { Context } from "../index";

interface Parent {
	Ports: Array<string>;
}

const ports = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Ports;
};

export default ports;
