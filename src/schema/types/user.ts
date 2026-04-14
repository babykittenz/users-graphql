import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} from "graphql";
import _ from "lodash";

// ── Services ─────────────────────────────────────────────────────────────────────

import { getCompanyById } from "../../services/company.service";

// ── Types ─────────────────────────────────────────────────────────────────────

import { Company, CompanyType } from "./company";
import { AppContext } from "./app";

export interface User {
  id: string;
  firstName: string;
  age: number;
  companyId?: string;
}

export const UserType: GraphQLObjectType<User, AppContext> =
  new GraphQLObjectType<User, AppContext>({
    name: "User",
    fields: () => ({
      id: { type: new GraphQLNonNull(GraphQLID) },
      firstName: { type: new GraphQLNonNull(GraphQLString) },
      age: { type: new GraphQLNonNull(GraphQLInt) },
      company: {
        type: CompanyType,
        resolve: async (parentValue): Promise<Company | undefined> => {
          return await (parentValue.companyId
            ? getCompanyById(parentValue.companyId)
            : undefined);
        },
      },
    }),
  });
