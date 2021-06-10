import fs from "fs";
import path from "path";

import { gql } from "apollo-server-express";

const schema: any = [fs.readFileSync(path.join(__dirname, "../schema.graphql"), "utf8")];
const typeDefs: any = gql(schema);

import query from "./Query";
import mutation from "./Mutation";
import subscription from "./Subscription";

import user from "./User";
import container from "./Container";

const resolvers = {
	Query: query,
	Mutation: mutation,
	Subscription: subscription,
	User: user,
	Container: container
};

export { typeDefs, resolvers };
