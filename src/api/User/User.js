import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    friends: async ({id}) => prisma.user({id}).friends(),
    rooms: async ({ id }) => prisma.user({ id }).rooms()
  }
};
