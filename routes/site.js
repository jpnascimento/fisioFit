module.exports = function(app) {

    app.get('/', function(req, res) {

        var connection = app.infra.connectionFactory();

        var itemDao = new app.infra.ItemDao(connection);

        itemDao.lista(function(erro, resultado, campos) {

            res.render('home/index', { livros: resultado });
        });
    });
}
