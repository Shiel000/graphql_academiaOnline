// console.log("holis")
import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import {ApolloServer} from 'apollo-server-express';
import schema from './schema';
import expressPlayGround from 'graphql-playground-middleware-express';


const app: Application = express();
app.use('*',cors());
app.use(compression());

const servidor = new ApolloServer({
  schema,
  introspection: true,
});

servidor.applyMiddleware({ app });
app.get('/',expressPlayGround({
    endpoint : '/graphql'
}))


const httpServer = createServer(app);
const  PORT = 30000;
httpServer.listen(
    {
        port : PORT
    },
    ()=> console.log(`Servidor de la academia en el puerto :${PORT}/graphql`)
);

