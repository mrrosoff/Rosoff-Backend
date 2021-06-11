import mongodb, { MongoClient as MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGO_URI) {
	throw Error("MONGO_URI Is Not Defined");
}

export const client: MongoClient = new mongodb.MongoClient(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
