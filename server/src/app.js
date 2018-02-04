const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const tediousExpress = require('express4-tedious')
const app = express()
const http    = require('http').Server(app)
const io      = require('socket.io')(http)
//Middlewares

//SQL Server connection
app.use(function (req, res, next) {
    req.sql = tediousExpress(req, {
    "server"  : "192.168.108.191", //Gab's machine
    "userName": "sa",
    "password": "blueroom",
    "options": { "encrypt": true, "database": "BlueDat", "port": 51126}
    });
    next();
});
//HTTP requests middlewares (Morang + bodyParser + CORS)
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send({hello: 'world'})
});

app.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  req.sql("SELECT * from USERS as U order by U.U_ID for json path")
  .fail(genFail)
  .into(res)
});

//TODO: Properly set this up
app.get('/chatrooms', function(req, res){
  res.sendFile(__dirname + "/../client/src/chatengine.html")
})

//Socket.io chatroom
io.on('connection', function(socket) {
  console.log("user connected")
  socket.on('setUserChatroom', function(data) {
    let keys = Object.keys(io.sockets.adapter.sids[socket.id])
    for (const room of keys) {
      if (room != socket.id) {
        io.to(room).emit('chatMessage', `${data.user} a quitté(e) le chat ${room}.`)
      }
    }
    if(!io.sockets.adapter.rooms[data.chatroom]) {
      io.of(data.chatroom)
    }
    socket.join(data.chatroom)
    io.to(data.chatroom).emit('chatMessage', `${data.user} a rejoint le chat ${data.chatroom}.`)
  })
  socket.on('chatMessage', function(msg){
    let keys = Object.keys(io.sockets.adapter.sids[socket.id])
    for (const room of keys) {
      if (room != socket.id) {
        io.to(room).emit('chatMessage', msg)
      }
    }
  })
  socket.on('exitChatroom', function(user) {
    let keys = Object.keys(io.sockets.adapter.sids[socket.id])
    for (const room of keys) {
      if (room != socket.id) {
        io.to(room).emit('chatMessage', `${user} a quitté(e) le chat ${room}.`)
      }
    }
  })
  socket.on('disconnect', function() {
    console.log('user disconnected')
  })
})

http.listen(process.env.PORT || 8081)

genFail = function(ex, res) { 
  res.statusCode = 500;   
  res.write(ex.message);
  res.end();
};
