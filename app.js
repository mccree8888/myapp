const express = require('express')
const app = express()
var http = require('http').createServer(app);
const port = 3000
var fs = require('fs')
var io = require('socket.io')(http);

var com = require('./common.js')



if(com.useMongo == true){
  var mongo = require('./mongo/mongoose');
}



app.set('view engine', 'pug');
app.set('views', './views');
app.locals.pretty = true;

var router = require('./routes')(app);

app.use('/scripts', express.static(__dirname + '/scripts'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/socketio', express.static(__dirname + '/node_modules/socket.io-client/dist'));
app.use('/bootstrapcss', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/mongo', express.static(__dirname + '/mongo'));


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


io.on('connection', function(socket) {
  console.log("socket IO");
});
