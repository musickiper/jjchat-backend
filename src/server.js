import "./env";
import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import logger from "morgan";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

// Logger
server.express.use(logger("dev"));
// Auth
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => console.log(`Server in on port ${PORT}`));
