module.exports = function(app) {
    
    app.get('/promocoes/form', function(req, res) {
        
        var connection = app.infra.connectionFactory();
        var produtoDao = new app.infra.ProdutoDao(connection);
        
        produtoDao.lista(function(erro, resultado, campos) {
            res.render('promocoes/form', { lista: resultado });
        });
        
    });
    
    app.post('/promocoes', function(req, res) {
    
        var promocao = req.body;
        var io = app.get('io');
        
        io.emit('novaPromocao', promocao);
        res.redirect('/promocoes/form');
    });
}