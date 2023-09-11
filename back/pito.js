const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    socket.emit('chatHistory', messages);
  });

  socket.on('sendMessage', async ({ roomId}) => {
    io.to(roomId).emit('message', message);
  });

  socket.on('disconnect', () => {
    // Manejar desconexiones si es necesario
  });
});

// Iniciar el servidor
server.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
