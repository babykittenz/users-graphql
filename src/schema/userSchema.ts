import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLFieldConfig,
} from "graphql";
import _ from "lodash";

// ── Types ─────────────────────────────────────────────────────────────────────

import { User, UserAppContext } from "./types/user";

// making a hard coded list of user

const users = [
  { id: "1", firstName: "John", age: 30 },
  { id: "2", firstName: "Jane", age: 25 },
  { id: "3", firstName: "Alice", age: 28 },
];

// ── Object Types ──────────────────────────────────────────────────────────────

export const UserType = new GraphQLObjectType<User, UserAppContext>({
  name: "User",
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const userField: GraphQLFieldConfig<unknown, UserAppContext> = {
  // the user that is returned by this field will be of type UserType
  type: UserType,
  // if you give me an id, I will return a user with that id, and some dummy data for the other fields
  args: {
    id: { type: GraphQLString },
  },
  // Resolve is where we actually go into our database and fetch the data that we need to return for this field.
  // In this case, we are just returning a dummy user object with the id that was passed in as an argument,
  // and some hardcoded values for the firstName and age fields.
  resolve: (_parentValue, args): User | undefined => {
    return _.find(users, {
      id: args.id,
    });
  },
};

// ── Root Query ────────────────────────────────────────────────────────────────

// The purpose of a root query to define the entry points for our GraphQL API.
// It specifies the available queries that clients can execute to retrieve data from the server.
// Each field in the root query corresponds to a specific query that clients can use to request data,
// and it defines the structure of the response that clients will receive when they execute that query.
const QueryType = new GraphQLObjectType<unknown, UserAppContext>({
  name: "RootQueryType",
  fields: {
    user: userField,
  },
});

// ── Schema ────────────────────────────────────────────────────────────────────

// we merge together the root query and the user type to create our schema, which is what we will use to create
// our GraphQL server in src/server.ts
export const userSchema = new GraphQLSchema({
  query: QueryType,
});
