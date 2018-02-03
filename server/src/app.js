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
  .into(res);
});

app.listen(process.env.PORT || 8081)

genFail = function(ex, res) { 
  res.statusCode = 500;   
  res.write(ex.message);
  res.end();
};
