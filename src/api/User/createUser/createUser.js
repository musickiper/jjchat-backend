import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createUser: (_, { username, password }) =>
      prisma.createUser({
        username,
        password
      })
  }
};
