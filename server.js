var app = require('./custom-express.js')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

// --- Substituido
//app.listen(3000, function() {
http.listen(3000, function() {
    console.log('Servidor rodando..');
});