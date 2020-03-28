var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  // res.sendFile(__dirname + '/index.html');
  res.send("Welcome to home API..!!");
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("message",function(data){
    console.log("data received ", data);
    SendMessageToAllConnctedUsers(data);
  })
});

const SendMessageToAllConnctedUsers = function(message){
  message = JSON.parse(message);
  message.time = Date.now();
  io.emit("message", JSON.stringify(message));
}
http.listen(3000, function(){
  console.log('listening on *:3000');
});