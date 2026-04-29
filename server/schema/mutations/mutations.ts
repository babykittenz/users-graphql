import { GraphQLObjectType } from "graphql";

// Mutations
import { addUser, deleteUser, editUser } from "./user.mutations";
import { deleteCompany } from "./company.mutations";

export const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addUser,
    deleteUser,
    editUser,
    deleteCompany,
  },
});
