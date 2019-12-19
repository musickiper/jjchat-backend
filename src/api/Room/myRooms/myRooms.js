import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    myRooms: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;

      return prisma.rooms({
        where: {
          participants_some: {
            id_in: [user.id]
          }
        }
      });
    }
  }
};
