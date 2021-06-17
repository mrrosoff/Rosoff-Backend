import { Context } from "../index";

interface Parent {
	Image: string;
}

const imageId = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.Image;
};

export default imageId;
