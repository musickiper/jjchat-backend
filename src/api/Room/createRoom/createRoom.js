import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        createRoom: async (_, args, {request, isAuthenticated}) => {
            isAuthenticated(request);
            const {toIds} = args;
            const {user} = request;

            // Setup Filters to check if there is a previously existing room
            const filters = [];
            filters.push({
                "participants_every": {
                    "id_in": [user.id, ...toIds]
                }
            });
            filters.push({
                "participants_some": {
                    "id": user.id
                }
            });
            toIds.forEach(id => filters.push({
                "participants_some": {
                    "id": id
                }
            }));

            try {
                // Check room existence
                const roomExistence = await prisma.$exists.room({
                    AND: filters
                });

                // If room doesn't exist, create a new room
                if (!roomExistence) {
                    const participants = toIds.map(toId => ({id: toId}));
                    return prisma.createRoom({
                        participants: {
                            connect: [{id: user.id}, ...participants]
                        }
                    });
                    // If room exists, return the existing room
                } else {
                    const rooms = await prisma.rooms({
                        where: {
                            AND: filters
                        }
                    });
                    return rooms[0];
                }
            } catch (e) {
                throw Error(e);
            }
        }
    }
}
