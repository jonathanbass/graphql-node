import * as cors from "cors";
import { json } from "body-parser";
import * as express from "express";
import * as http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { resolvers, typeDefs } from "./GraphQLSchema";

(async () => {
    const app = express();
    const httpServer = http.createServer(app);

    const graphQlServer = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await graphQlServer.start();

    app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(graphQlServer));

    const port = process.env.PORT || 3001;
    await new Promise<void>((resolve) => httpServer.listen({ port: port }, resolve));
    console.log(`Server listening on http://localhost:${port}/`);
})();
