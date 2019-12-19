import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { toIds, text } = args;
      try {
        const roomExistence = await prisma.$exists.room({
          participants_every: {
            id_in: [user.id, ...toIds]
          },
          participants_none: {
            id_not_in: [user.id, ...toIds]
          }
        });
        if (!roomExistence) {
          const participants = toIds.map(toId => ({ id: toId }));
          const newRoom = await prisma.createRoom({
            participants: {
              connect: [{ id: user.id }, ...participants]
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
                id_in: [user.id, ...toIds]
              },
              participants_none: {
                id_not_in: [user.id, ...toIds]
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
