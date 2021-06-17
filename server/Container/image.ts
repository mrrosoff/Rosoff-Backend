import { Context } from "../index";

interface Parent {
	config: {
		Image: string;
	};
}

const image = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.config.Image;
};

export default image;
