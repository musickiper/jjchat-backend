import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        sendMessage: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {user} = request;
            const {roomId, text} = args;

            return prisma.createMessage({
                text,
                room: {
                    connect: {
                        id: roomId
                    }
                },
                user: {
                    connect: {
                        id: user.id
                    }
                }
            });
        }
    }
};
