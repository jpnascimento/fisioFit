var express = require('express');
var load = require("express-load");
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var flash = require("connect-flash");
var expressValidator = require("express-validator");

module.exports = function() {
    
    var app = express();
    app.set('view engine', 'ejs');
    
    app.use(express.static('./public'));
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());
    
    app.use(expressValidator());
    app.use(session({ secret: 'xyz' }));
    app.use(cookieParser());
    app.use(flash());
    
    // ---- Substituido
    // require('./routes/produtos')(app);
    // Carrega todos os arquivos .js sob o diretório indicado
    load('routes')
    // Carrega todos os arquivos .js sob o diretório indicado
        .then('infra')
    // Joga no 'app'
        .into(app);
    
    // --- Rotas para os erros
    app.use(function(req, res, next) {
        // Erro 404
        res.status(404).render('erros/404');
        // Erro 500
        res.status(500).render('erros/500');
    });
    
    return app;
} 