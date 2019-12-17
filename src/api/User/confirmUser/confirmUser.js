import { generateToken } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    confirmUser: async (_, args) => {
      const { username, password } = args;
      try {
        const user = await prisma.user({ username });
        if (user.password === password) {
          return generateToken(username);
        } else {
          throw Error("Wrong username / password conversion");
        }
      } catch (e) {
        throw Error(e);
      }
    }
  }
};
