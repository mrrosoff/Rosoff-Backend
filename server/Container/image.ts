import { Context } from "../index";

interface Parent {
	Config: {
		Image: string;
	};
}

const image = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Config.Image;
};

export default image;
