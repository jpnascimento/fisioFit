module.exports = function(app) {
    
    app.get('/', function(req, res) {
        
        var connection = app.infra.connectionFactory();
    
        var produtoDao = new app.infra.ProdutoDao(connection);
        
        produtoDao.lista(function(erro, resultado, campos) {
            
            res.render('home/index', { livros: resultado });
        });
    });
}