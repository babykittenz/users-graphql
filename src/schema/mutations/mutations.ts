import { GraphQLObjectType } from "graphql";

// Fields
import { addUser, deleteUser, editUser } from "./user.fields";

export const mutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addUser,
    deleteUser,
    editUser,
  },
});
