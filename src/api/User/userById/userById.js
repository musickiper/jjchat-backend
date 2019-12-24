import {prisma} from "../../../../generated/prisma-client";

export default {
    Query: {
        userById: async(_,args,{request,isAuthenticated}) => {
            isAuthenticated(request);
            const {userId} = args;
            return prisma.user({id:userId});
        }
    }
}
