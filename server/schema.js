import fs from "fs";
import path from "path";

import { gql } from "apollo-server-express";

const schema = [fs.readFileSync(path.join(__dirname, "../schema.graphql"), "utf8")];
const typeDefs = gql(schema);

import * as query from "./Query";
import * as mutation from "./Mutation";
import * as subscription from "./Subscription";

import * as user from "./User";
import * as container from "./Container";

const resolvers = {
	Query: query,
	Mutation: mutation,
	Subscription: subscription,
	User: user,
	Container: container
};

export { typeDefs, resolvers };
