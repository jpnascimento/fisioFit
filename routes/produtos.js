//var connectionFactory = require('../infra/connectionFactory');
//var ProdutoDao = require('../infra/ProdutoDao');

module.exports = function(app) { 
    // Rota para a lista de produtos
    app.get('/produtos', function(req, res) {
        
        var salvo = req.flash('salvo');
        
        // --- Substituido
        //var connection = connectionFactory();
        var connection = app.infra.connectionFactory();
        
        // --- Substituido
        //var produtoDao = new ProdutoDao(connection);
        var produtoDao = new app.infra.ProdutoDao(connection);
        
        produtoDao.lista(function(erro, resultados) {
            if (erro) {
                res.status(404).send('Náo há produtos cadastrados.');
                console.error(erro);
            } else {
                res.format({
                    html: function() {
                        var salvo = req.flash('salvo');
                        res.render('produtos/lista', { livros: resultados, salvo: salvo });
                    },
                    json: function() {
                        res.json(resultados);
                    },
                    default: function() {
                        res.sendStatus(406);
                    }
                });
            }
            // res.render('produtos/lista', { livros : resultados, salvo : salvo });
        });
        
    });
    
    // Rota carrega formulário de produtos
    app.get('/produtos/form', function(req, res) {
        res.render('produtos/form');
    });

    // Rota salvar novo produto
    app.post('/produtos', function(req, res) {
        
        // Recupera livro da requisição
        var livro = req.body;
        
        // *** Validação 
        req.assert('titulo', 'Titulo obrigatório').notEmpty();
        req.assert('preco', 'Preço numérico').isFloat();
        
        var errors = req.validationErrors();
        if (errors) {
            res.format({
                html: function() {
                    res.status(400).render('produtos/form', { validationError: errors });
                },
                json: function() {
                    res.status(400).send(errors);
                }
            });
            return;
        }
        
        // Chama a factory de conexões
        var connection = app.infra.connectionFactory();
        // Chama dao de produtos
        var produtoDao = new app.infra.ProdutoDao(connection);
        
        produtoDao.salva(livro, function(erro, resultados) {
            if (erro) {
                res.status(404).send('');
                // console.error(erro);
            }
            // --- Substituido
            // res.render('produtos/salva');
            req.flash('salvo', 'Livro salvo com sucesso!');
            res.redirect('/produtos');
        });
    });
    
    // Rota para a busca por id
    app.get('/produtos/:id', function(req, res, next) {
        
        var id = req.params.id;

        // Chama factory de conexões
        var connection = app.infra.connectionFactory();
        // Chama dao de produtos
        var produtoDao = new app.infra.ProdutoDao(connection);
        
        produtoDao.pesquisa(id, function(erro, resultado) {
            if (erro) {
                next(erro);
                return;
            } 
            if (resultado.length == 0) {
                res.status(404).send('Produto não encontrado!');
                return;
            }
            res.format({
                html: function() {
                    res.render('produtos/detalhe', { livro: resultado[0] });
                },
                json: function() {
                    res.json(resultado[0]);
                }
            });
        });
    });
}
            