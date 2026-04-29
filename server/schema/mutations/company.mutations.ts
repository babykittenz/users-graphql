import { GraphQLString, GraphQLNonNull, GraphQLFieldConfig } from "graphql";

// services
import { deleteCompanyById } from "../../services/company.service";

// types
import { CompanyType } from "../types/company";
import { AppContext } from "../types/app";

// mutations
export const deleteCompany: GraphQLFieldConfig<unknown, AppContext> = {
  type: CompanyType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parentValue, { id }: { id: string }): Promise<void> => {
    return await deleteCompanyById(id);
  },
};
