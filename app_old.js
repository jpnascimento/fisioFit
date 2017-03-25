var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/produtos', function(req, res) {
    console.log('Recebeu requisição, teste 2017');
    // ---- Substitui para utilizar o redenrizador 'ejs'
    // res.send('<html><body><h1>Ola</h1></body></html>');
    // ---- Renderizador
    res.render('produtos/lista');
});

var server = app.listen(3000, function() {
    console.log('Servidor rodando');
});