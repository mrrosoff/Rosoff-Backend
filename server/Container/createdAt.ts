import { Context } from "../index";
import { Container } from "./index";

const createdAt = async (parent: Container, args: any, context: Context, info: any) => {
	return parent.Created;
};

export default createdAt;
