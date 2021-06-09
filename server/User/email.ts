import { checkIsMe } from "../utils";

const email = (parent: any, args: any, context: any, info: any) => {
	checkIsMe(parent, context);
	return parent.email;
};

export default email;
