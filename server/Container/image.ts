import { Context } from "../index";
import { Container } from "./index";

const image = async (parent: Container, args: any, context: Context, info: any) => {
	return {
		id: parent.Image,
		name: parent.Config.Image,
	}
};

export default image;
