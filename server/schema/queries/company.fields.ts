import {
  GraphQLFieldConfig,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";

// Services
import { getCompanyById, getCompanies } from "../../services/company.service";

// Types
import { Company, CompanyType } from "../types/company";
import { AppContext } from "../types/app";

export const companyField: GraphQLFieldConfig<unknown, AppContext> = {
  type: CompanyType,
  args: {
    id: { type: GraphQLString },
  },
  // Resolve is where we actually go into our database and fetch the data that we need to return for this field.
  resolve: async (_parentValue, args): Promise<Company | undefined> => {
    return await getCompanyById(args.id);
  },
};

export const companiesField: GraphQLFieldConfig<unknown, AppContext> = {
  type: new GraphQLList(CompanyType),
  resolve: async (): Promise<Company[] | undefined> => {
    return await getCompanies();
  },
};
