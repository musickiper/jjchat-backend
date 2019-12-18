import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toId, text } = args;
      try {
        const roomExistence = await prisma.$exists.room({
          participants_every: {
            id_in: [user.id, toId]
          }
        });
        if (!roomExistence) {
          const newRoom = await prisma.createRoom({
            participants: {
              connect: [{ id: user.id }, { id: toId }]
            }
          });
          return prisma.createMessage({
            text,
            user: {
              connect: {
                id: user.id
              }
            },
            room: {
              connect: {
                id: newRoom.id
              }
            }
          });
        } else {
          const room = await prisma.rooms({
            where: {
              participants_every: {
                id_in: [user.id, toId]
              }
            }
          });

          return prisma.createMessage({
            text,
            user: {
              connect: {
                id: user.id
              }
            },
            room: {
              connect: {
                id: room[0].id
              }
            }
          });
        }
      } catch (e) {
        throw Error(e);
      }
    }
  }
};
