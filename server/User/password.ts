import CryptoJS from "crypto-js";
import dotenv from "dotenv";

import { Context } from "../index";
import { checkIsMe } from "../utils";

dotenv.config();

interface Parent {
	_id: string;
	password: string;
}

const password = (parent: Parent, args: any, context: Context, info: any) => {
	checkIsMe(parent, context);
	if (!process.env.PASSWORD_KEY) {
		throw Error("PASSWORD_KEY Is Not Defined");
	}
	const bytes = CryptoJS.AES.decrypt(parent.password, process.env.PASSWORD_KEY);
	return bytes.toString(CryptoJS.enc.Utf8);
};

export default password;
