import { Context } from "../index";
import { Container } from "./index";

const status = async (parent: Container, args: any, context: Context, info: any) => {
	return parent.State.Status.toUpperCase();
};

export default status;
