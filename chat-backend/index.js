const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Lidar com a conexão de um cliente
io.on('connection', (socket) => {
  console.log('Usuário conectado:', socket.id);

  // Ouvir e retransmitir as mensagens recebidas
  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message); // Enviar mensagem a todos os clientes conectados
  });

  // Desconectar o cliente
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

// Iniciar o servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log('Servidor rodando na porta ${PORT}');
});