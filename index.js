import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorMiddleware, notFoundMiddleware } from './middleware/errorMiddleware.js';
import http from 'http';
import wsHandler from './wsHandler.js';

import welcomeRoutes from './routes/welcomeRoutes.js';
import authRoutes from './routes/authRoutes.js';
import friendRoutes from './routes/friendRoutes.js';

const app = express();
const server = http.Server(app);
const ws = wsHandler(server);
dotenv.config();

//middlewares
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/', welcomeRoutes);
app.use('/auth', authRoutes);
app.use('/friend', friendRoutes);

//error middlewares
app.use(errorMiddleware);
app.use(notFoundMiddleware);

//listen socket.io
ws.listen();

//serve
server.listen(process.env.PORT, () => {
    console.log(`Server started on *:${process.env.PORT}`);
});