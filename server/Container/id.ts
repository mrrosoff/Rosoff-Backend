import { Context } from "../index";
import { Container } from "./index";

const id = async (parent: Container, args: any, context: Context, info: any) => {
	return parent.Id;
};

export default id;
