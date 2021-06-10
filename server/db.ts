import mongodb from "mongodb";
import dotenv from "dotenv";

const { MongoClient } = mongodb;

dotenv.config();

if (!process.env.MONGO_URI) {
	throw Error("MONGO_URI Is Not Defined");
}

export const client = new MongoClient(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

export const removeNullArgs = (args: any): any => {
	return Object.fromEntries(Object.entries(args).filter(([_, v]) => v != null));
};
