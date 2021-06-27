import { Context } from "../index";
import { Container } from "./index";

const name = async (parent: Container, args: any, context: Context, info: any) => {
	return parent.Name;
};

export default name;
