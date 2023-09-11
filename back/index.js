import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = 3000;

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Cambia a la URL correcta del cliente
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

io.on('connection', (socket) => {
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`Usuario ${socket.id} se unió a la sala: ${roomName}`);
    
    socket.on('message', (body) => {
      console.log(`Mensaje recibido: ${body} de ${socket.id}`);
      socket.broadcast.to(roomName).emit('message', {
        body,
        from: socket.id.slice(6)
      })
    })
    
    socket.on('connect', () => {
      console.log('Conectado al servidor');
    });
    
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
    });
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server up! 🚀 PORT: ${PORT}`);
});
