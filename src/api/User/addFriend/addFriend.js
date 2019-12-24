import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        addFriend: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            const {friendId} = args;

            try {
                return await prisma.updateUser({
                    data: {
                        friends: {
                            connect: {
                                id: friendId
                            }
                        }
                    },
                    where: {
                        id: user.id
                    }
                });
            } catch (e) {
                throw Error(e);
            }
        }
    }
}
