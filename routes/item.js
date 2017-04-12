//var connectionFactory = require('../infra/connectionFactory');
//var itemDao = require('../infra/itemDao');

module.exports = function(app) {
    // Rota para a lista de item
    app.get('/item', function(req, res) {

        var salvo = req.flash('salvo');

        // --- Substituido
        //var connection = connectionFactory();
        var connection = app.infra.connectionFactory();

        // --- Substituido
        //var itemDao = new itemDao(connection);
        var itemDao = new app.infra.ItemDao(connection);

        itemDao.lista(function(erro, resultados) {
            if (erro) {
                res.status(404).send('Não há item cadastrados.');
                console.error(erro);
            } else {
                res.format({
                    html: function() {
                        var salvo = req.flash('salvo');
                        res.render('item/lista', { item: resultados, salvo: salvo });
                    },
                    json: function() {
                        res.json(resultados);
                    },
                    default: function() {
                        res.sendStatus(406);
                    }
                });
            }
        });

    });

    // Rota carrega formulário de item
    app.get('/item/form', function(req, res) {
        res.render('item/form');
    });

    // Rota salvar novo item
    app.post('/item', function(req, res) {

        // Recupera livro da requisição
        var livro = req.body;

        // *** Validação
        req.assert('titulo', 'Titulo obrigatório').notEmpty();
        req.assert('preco', 'Preço numérico').isFloat();

        var errors = req.validationErrors();
        if (errors) {
            res.format({
                html: function() {
                    res.status(400).render('item/form', { validationError: errors });
                },
                json: function() {
                    res.status(400).send(errors);
                }
            });
            return;
        }

        // Chama a factory de conexões
        var connection = app.infra.connectionFactory();
        // Chama dao de item
        var itemDao = new app.infra.ItemDao(connection);

        itemDao.salva(livro, function(erro, resultados) {
            if (erro) {
                res.status(404).send('');
                // console.error(erro);
            }
            // --- Substituido
            // res.render('item/salva');
            req.flash('salvo', 'Livro salvo com sucesso!');
            res.redirect('/item');
        });
    });

    // Rota para a busca por id
    app.get('/item/:id', function(req, res, next) {

        var id = req.params.id;

        // Chama factory de conexões
        var connection = app.infra.connectionFactory();
        // Chama dao de item
        var itemDao = new app.infra.ItemDao(connection);

        itemDao.pesquisa(id, function(erro, resultado) {
            if (erro) {
                next(erro);
                return;
            }
            if (resultado.length == 0) {
                res.status(404).send('Item não encontrado!');
                return;
            }
            res.format({
                html: function() {
                    res.render('item/detalhe', { livro: resultado[0] });
                },
                json: function() {
                    res.json(resultado[0]);
                }
            });
        });
    });
}
