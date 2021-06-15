import { Context } from "../index";

interface Parent {
	ImageID: string;
}

const imageId = async (parent: Parent, args: any, context: Context, info: any) => {
	return parent.ImageID;
};

export default imageId;
