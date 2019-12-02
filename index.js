const express = require("express");
const app = express();
const http = require('http').Server(app);
const reload = require('reload');
var io = require('socket.io').listen(http);


io.on('connection', function(socket){
  console.log("connected")
  socket.on('accepted', function(msg){
    console.log('message: ' + msg);
    io.emit("transmitter",msg)
  });
});

app.use('/assets', express.static(__dirname +  '/assets'))

app.get("/motorista/inicio", (req, res) => {
  res.sendFile(__dirname + "/assets/motorista/inicio.html");
});

app.get("/motorista/mapa", (req, res) => {
  res.sendFile(__dirname + "/assets/motorista/mapa.html");
});

app.get("/motorista/perfil", (req, res) => {
  res.sendFile(__dirname + "/assets/motorista/meuPerfil.html");
});

app.get("/caroneiro/inicio", (req, res) => {
  res.sendFile(__dirname + "/assets/caroneiro/inicio.html");
});

app.get("/caroneiro/perfil", (req, res) => {
  res.sendFile(__dirname + "/assets/caroneiro/meuPerfil.html");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/assets/index.html");
});
const PORT = process.env.PORT || 5000;
http.listen(PORT, function() {
  console.log(`App listening on port ${PORT}`);
});

reload(app);