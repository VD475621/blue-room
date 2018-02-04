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
  res.send({root: 'root'})
});

app.get('/users', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  req.sql("SELECT * from USERS as U order by U.U_ID for json path")
  .fail(genFail)
  .into(res)
});

// create user
app.post('/user', (req, res) => {
  var user = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var ishelper = req.body.ishelper;
  var help = (ishelper) ? "1" : "0";

  res.setHeader('Content-Type', 'application/json');
  req.sql(`INSERT INTO USERS(Username,Couriel,Passwd,IsHelper) VALUES('${user}','${email}','${password}','${help}') for json path`)
  .fail(genFail)
  .into(res)
});

// find user for login
app.post('/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  res.setHeader('Content-Type', 'application/json');
  req.sql(`SELECT CASE WHEN EXISTS (SELECT * FROM [USERS] WHERE Couriel = '${email}' and Passwd = '${password}') THEN CAST(1 AS BIT) ELSE CAST(0 AS BIT) END  for json path`)
  .fail(genFail)
  .into(res)
});

// is helper
app.get('/is_help/:email', (req, res) => {
  var email = req.params.email;
  res.setHeader('Content-Type', 'application/json');
  req.sql(`SELECT USERS.IsHelper FROM USERS WHERE USERS.Couriel='${email}'  for json path`)
  .fail(genFail)
  .into(res)
});

//create room(chat)
app.post('/room', (req, res) => {
  var u1 = req.body.u1;
  var u2 = req.body.u2;
  res.setHeader('Content-Type', 'application/json');
  req.sql(`INSERT INTO CHAT(U_ID1,U_ID2) VALUES('${u1}','${u2}') for json path`)
  .fail(genFail)
  .into(res)
  
});

// create demande
app.post('/demande', (req, res) => {
  var user = req.body.username;
  res.setHeader('Content-Type', 'application/json');
  req.sql(`INSERT INTO DEMANDE(UD_ID,AskTime) VALUES((SELECT U_ID from USERS WHERE USERS.Username='${user}'), GETDATE()) for json path`)
  .fail(genFail)
  .into(res)
});

// get all demande
app.get('/demandes', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  req.sql(`SELECT * FROM DEMANDE WHERE Active='1' for json path`)
  .fail(genFail)
  .into(res)

});

// insert message
app.post('/message', (req, res) => {
  var chatid = req.body.chatid;
  var userid = req.body.userid;
  var content = req.body.content;
  res.setHeader('Content-Type', 'application/json');
  req.sql(`INSERT INTO U_MESSAGE(Chat_ID,S_ID,Content,SendTime) VALUES( '${chatid}','${userid}' ,'${content}', GETDATE()) for json path`)
  .fail(genFail)
  .into(res)
  
});

// get messages
app.get('/messages/:chatid', (req, res) => {
  var chatid = req.params.chatid;

  res.setHeader('Content-Type', 'application/json');
  req.sql(`SELECT * FROM U_MESSAGE WHERE(SendTime IN (SELECT TOP (20) SendTime FROM U_MESSAGE WHERE Chat_ID ='${chatid}' ORDER BY SendTime DESC)) ORDER BY SendTime for json path`)
  .fail(genFail)
  .into(res)
  
});

//TODO: Properly set this up
app.get('/chatrooms', function(req, res){
  res.sendFile("D:/Documents/Git/team-du-desespoir/client/src/chatengine.html")
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
