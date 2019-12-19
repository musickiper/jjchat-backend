import { prisma } from "../../../generated/prisma-client";

export default {
  Message: {
    user: async ({ id }) => prisma.message({ id }).user(),
    room: async ({ id }) => prisma.message({ id }).room()
  }
};
