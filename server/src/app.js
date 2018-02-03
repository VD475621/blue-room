const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const tediousExpress = require('express4-tedious')
 
const app = express()
//Middlewares

//SQL Server connection
app.use(function (req, res, next) {
    req.sql = tediousExpress(req, {
    "server"  : "192.168.108.123", //Gab's machine
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
  res.setHeader('Content-Type', 'application/json')
  req.sql("SELECT U.UserID, U.Username, U.Passwd, U.AccountType from USERS as U order by U.UserID for json path").fail(genFail).into(res);
})

app.listen(process.env.PORT || 8081)

genFail = function(ex, res) { 
  res.statusCode = 500;   
  res.write(ex.message);
  res.end();
}