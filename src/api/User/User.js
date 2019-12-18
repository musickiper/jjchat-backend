import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    rooms: async ({ id }) => prisma.user({ id }).rooms()
  }
};
