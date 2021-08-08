import { Server } from 'socket.io';

const wsHandler = (server) => {
    const io = new Server(server, {
        cors:true,
        origins:["http://127.0.0.1:5347"]
    });

    return {
        listen: () => listen(io)
    };
};

const listen = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
    
        socket.on('chat', (msg) => {
            io.emit('chat-masuk', msg);
        });
    });
}

export default wsHandler;