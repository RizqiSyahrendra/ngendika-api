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
    io.use((socket, next) => {
        const { id, email } = socket.handshake.auth;
        if (!email) {
            return next(new Error('invalid email'));
        }
        
        socket.user_id = id;
        socket.email = email;
        return next();
    });

    io.sockets.on('connection', (socket) => {
        console.log(socket.email + ' joined');
        socket.join(socket.email);

        socket.on('private-message', ({to, message}) => {
            io.sockets.in(to.email).emit('private-message-incoming', {
                from: {
                    user_id: socket.user_id,
                    email: socket.email
                }, 
                message
            });
        });
    });
}

export default wsHandler;