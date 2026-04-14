import { GraphQLString, GraphQLFieldConfig } from "graphql";

// Services
import { getUserById } from "../../services/user.service";

// Types
import { User, UserType } from "../types/user";
import { AppContext } from "../types/app";

// This file defines the GraphQL fields for user-related queries, such as fetching a user by ID.
// Each field specifies the type of data it returns, the arguments it accepts, and the resolver function
// that performs the actual operation using the services defined in the user service.

export const userField: GraphQLFieldConfig<unknown, AppContext> = {
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
