import express, { RequestHandler } from "express";
import http from "http";

import { ApolloServer, PubSub, AuthenticationError } from "apollo-server-express";
import { express as voyagerMiddleware } from "graphql-voyager/middleware/index.js";

import { Db } from "mongodb";
import dotenv from "dotenv";

import { promises as fs } from "fs";
import handlebars from "handlebars";

import AppleSignIn from "apple-signin-auth";

import { authenticateHTTPAccessToken, generateAccessToken } from "./auth";
import { client } from "./db";
import mocks from "./mocking";
import { typeDefs, resolvers } from "./schema";
import createUser from "./Mutation/createUser";

const pubsub = new PubSub();

const app = express();
const serverMocks = process.env.MOCK ? mocks : undefined;
const serverTracing = process.env.MOCK ? true : undefined;

dotenv.config();

await client.connect();

export interface Context {
	userId: string;
	db: Db;
	pubsub: any;
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	mocks: serverMocks,
	tracing: serverTracing,
	formatError: (err) => {
		if (!err.extensions) {
			throw Error("Extensions Object Does Not Exist On Error");
		}
		if (err.extensions.code === "INTERNAL_SERVER_ERROR") {
			if (err.extensions) console.error(`${err.extensions.code}: ${err.message}`);
			else console.error(err);
		}
		return err;
	},
	context: ({ req, connection }): Context => {
		if (!connection) {
			throw Error("Connection Object Is Undefined");
		}
		return {
			userId: req ? authenticateHTTPAccessToken(req) : connection.context.userId,
			db: client.db("Kings-Corner"),
			pubsub: pubsub
		};
	},
	subscriptions: {
		onConnect: (connectionParams: any) => {
			if (!connectionParams.authorization)
				throw new AuthenticationError(
					"Authentication Token Must Be Provided For Subscriptions"
				);
			return {
				userId: authenticateHTTPAccessToken({ headers: connectionParams })
			};
		}
	}
});

server.start();
server.applyMiddleware({ app });

app.use(express.json() as RequestHandler);
app.use(express.urlencoded({ extended: true }) as RequestHandler);

app.post("/apple-login", async (req, res) => {
	if (!req.body || !req.body.id_token) return res.sendFile(__dirname + "/website/index.html");
	const data = await AppleSignIn.verifyIdToken(req.body.id_token, {
		audience: "com.meta-games.kings-corner-service",
		ignoreExpiration: true
	});

	const userRecord = await client
		.db("Kings-Corner")
		.collection("Users")
		.findOne({ email: data.email });

	let redirectAddress;
	let token;
	if (!!userRecord) {
		redirectAddress = !!userRecord.username ? "/app/dashboard" : "/finalize-account";
		token = generateAccessToken(userRecord._id.toString());
	} else {
		redirectAddress = "/finalize-account";
		token = await createUser(
			undefined,
			{ email: data.email },
			{ userId: "", db: client.db("Kings-Corner"), pubsub: undefined },
			undefined
		);
	}
	const file = await fs.readFile(__dirname + "/website/index.html");
	const template = handlebars.compile(file.toString());
	const replacements = {
		appleLogin: `localStorage.setItem("token", '${token}');
		window.location.href="${redirectAddress}";`
	};
	return res.send(template(replacements));
});

if (process.env.NODE_ENV === "development") {
	app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));
} else {
	const file = await fs.readFile(__dirname + "/website/index.html");
	const template = handlebars.compile(file.toString());
	const replacements = {
		appleLogin:
			"const easterEgg = 'If you found this, you should collaborate with us on GitHub. Check out https://github.com/Meta-Games-Biz/Kings-Corner'"
	};
	const convertedHTML = template(replacements);

	app.get("index.html", (req, res) => res.send(convertedHTML));
	app.use(express.static(__dirname + "/website"));
	app.get("*", (req, res) => res.send(convertedHTML));
}

const PORT = 8000;
const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT);

console.info(`🚀 Server Ready at localhost:${PORT}${server.graphqlPath}`);
console.info(`🚀 Subscriptions Ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
