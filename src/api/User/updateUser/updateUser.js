import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    updateUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { password, nickname, bio, avatar, wallpaper } = args;
      return prisma.updateUser({
        data: {
          password,
          nickname,
          bio,
          avatar,
          wallpaper
        },
        where: {
          id: user.id
        }
      });
    }
  }
};
