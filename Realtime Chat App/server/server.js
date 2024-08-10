const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io")
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000', // Next.js uygulamanızın çalıştığı URL
      methods: ['GET', 'POST']
    }
  });

app.use(cors());

// Sunucu tarafında
io.on('connection', (socket) => {
    console.log('Yeni bir kullanıcı bağlandı');

    // Mesaj gönderildiğinde
    socket.on('sendMessage', (data) => {
        // Mesajı odadaki tüm kullanıcılara gönder
        io.emit('responseMessage', data);
        console.log("[Mesaj gönderildi] Socket ID: " + socket.id + " - Room ID : " + data.room_id)
    });


    // Bağlantı kesildiğinde
    socket.on('disconnect', () => {
        console.log('Kullanıcı bağlantısı kesildi');
    });
});


server.listen(3001, () => console.log(`Sunucu 3001 portunda çalışıyor`));