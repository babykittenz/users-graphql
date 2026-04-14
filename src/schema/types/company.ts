import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} from "graphql";
import _ from "lodash";

// ── Services ─────────────────────────────────────────────────────────────────────

import { getUsersForCompany } from "../../services/company.service";

// ── Types ─────────────────────────────────────────────────────────────────────

import { User, UserType } from "./user";
import { AppContext } from "./app";

export interface Company {
  id: string;
  name: string;
  description: string;
  users: User[];
}

export const CompanyType: GraphQLObjectType<Company, AppContext> =
  new GraphQLObjectType<Company, AppContext>({
    name: "Company",
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      users: {
        type: new GraphQLNonNull(new GraphQLList(UserType)),
        resolve: async (parentValue): Promise<User[] | undefined> => {
          return await getUsersForCompany(parentValue.id);
        },
      },
    }),
  });
