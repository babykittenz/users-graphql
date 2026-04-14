import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFieldConfig,
} from "graphql";
import _ from "lodash";

// ── Services ─────────────────────────────────────────────────────────────────────

import { getUserById } from "../services/user.service";
import { getCompanyById } from "../services/company.service";

// ── Types ─────────────────────────────────────────────────────────────────────

import { User, UserType } from "./types/user";
import { Company, CompanyType } from "./types/company";
import { AppContext } from "./types/app";

// ── Fields ─────────────────────────────────────────────────────────────
// We define the fields for our root query here.
// Each field corresponds to a specific query that clients can use to request data from the server.

const companyField: GraphQLFieldConfig<unknown, AppContext> = {
  type: CompanyType,
  args: {
    id: { type: GraphQLString },
  },
  // Resolve is where we actually go into our database and fetch the data that we need to return for this field.
  resolve: async (_parentValue, args): Promise<Company | undefined> => {
    return await getCompanyById(args.id);
  },
};

const userField: GraphQLFieldConfig<unknown, AppContext> = {
  // the user that is returned by this field will be of type UserType
  type: UserType,
  // if you give me an id, I will return a user with that id, and some dummy data for the other fields
  args: {
    id: { type: GraphQLString },
  },
  // Resolve is where we actually go into our database and fetch the data that we need to return for this field.
  // In this case, we are just returning a dummy user object with the id that was passed in as an argument,
  // and some hardcoded values for the firstName and age fields.
  resolve: async (_parentValue, args): Promise<User | undefined> => {
    return await getUserById(args.id);
  },
};

// ── Root Query ────────────────────────────────────────────────────────────────

// The purpose of a root query to define the entry points for our GraphQL API.
// It specifies the available queries that clients can execute to retrieve data from the server.
// Each field in the root query corresponds to a specific query that clients can use to request data,
// and it defines the structure of the response that clients will receive when they execute that query.
const QueryType = new GraphQLObjectType<unknown, AppContext>({
  name: "RootQueryType",
  fields: {
    user: userField,
    company: companyField,
  },
});

// ── Schema ────────────────────────────────────────────────────────────────────

// we merge together the root query and the user type to create our schema, which is what we will use to create
// our GraphQL server in src/server.ts
export const userSchema = new GraphQLSchema({
  query: QueryType,
});
