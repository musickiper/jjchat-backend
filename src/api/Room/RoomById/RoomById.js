import {prisma} from "../../../../generated/prisma-client";

export default {
    Query: {
        roomById: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {roomId} = args;
            return prisma.room({id: roomId});
        }
    }
}
