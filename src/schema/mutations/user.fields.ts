import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLFieldConfig,
  GraphQLInt,
} from "graphql";

// Services
import { add, deleteById, update } from "../../services/user.service";

// Types
import { User, UserType } from "../types/user";
import { AppContext } from "../types/app";

// This file defines the GraphQL fields for user-related mutations, such as adding, deleting,
// and updating users. Each field specifies the type of data it returns, the arguments it accepts,
// and the resolver function that performs the actual operation using the services defined in the user service.

export const addUser: GraphQLFieldConfig<unknown, AppContext> = {
  type: UserType,
  args: {
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLString) },
    companyId: { type: GraphQLString },
  },
  resolve: async (
    _parentValue,
    { firstName, age }: { firstName: string; age: string },
  ): Promise<User> => {
    return await add(firstName, parseInt(age));
  },
};

export const deleteUser: GraphQLFieldConfig<unknown, AppContext> = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve: async (_parentValue, { id }: { id: string }): Promise<void> => {
    return await deleteById(id);
  },
};

export const editUser: GraphQLFieldConfig<unknown, AppContext> = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }, // <-- GraphQLInt instead of GraphQLString
    companyId: { type: GraphQLString },
  },
  resolve: async (
    _parentValue,
    {
      id,
      firstName,
      age,
      companyId,
    }: { id: string; firstName?: string; age?: number; companyId?: string },
  ): Promise<User | undefined> => {
    return await update(id, firstName, age, companyId);
  },
};
