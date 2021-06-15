import { Context } from "../index";

interface Parent {
	Image: string;
}

const image = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Image;
};

export default image;
