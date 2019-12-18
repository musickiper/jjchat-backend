import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: async ({ id }) => prisma.room({ id }).participants(),
    messages: async ({ id }) => prisma.room({ id }).messages()
  }
};
