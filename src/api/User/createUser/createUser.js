import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createUser: (_, {username, password, nickname}) =>
            prisma.createUser({
                username,
                password,
                nickname
            })
    }
};
