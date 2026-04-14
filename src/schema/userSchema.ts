import { GraphQLSchema, GraphQLObjectType } from "graphql";
import _ from "lodash";

// ── Types ─────────────────────────────────────────────────────────────────────

import { AppContext } from "./types/app";

// ── Mutations
import { mutation } from "./mutations/mutations";

// ── Fields ─────────────────────────────────────────────────────────────
// We define the fields for our root query here.
// Each field corresponds to a specific query that clients can use to request data from the server.

import { companyField } from "./queries/company.fields";
import { userField } from "./queries/user.fields";

// ── Root Query ────────────────────────────────────────────────────────────────

// The purpose of a root query to define the entry points for our GraphQL API.
// It specifies the available queries that clients can execute to retrieve data from the server.
// Each field in the root query corresponds to a specific query that clients can use to request data,
// and it defines the structure of the response that clients will receive when they execute that query.
const query = new GraphQLObjectType<unknown, AppContext>({
  name: "RootQuery",
  fields: {
    user: userField,
    company: companyField,
  },
});

// ── Schema ────────────────────────────────────────────────────────────────────

// we merge together the root query and the user type to create our schema, which is what we will use to create
// our GraphQL server in src/server.ts
export const userSchema = new GraphQLSchema({
  query,
  mutation,
});
