function ProdutoDao (connection) {
    this._connection = connection;
}

// Funçao para listar os livros
ProdutoDao.prototype.lista = function (callback) {
    this._connection.query('select * from livros', callback);
}

// Função para inserir novo livro
ProdutoDao.prototype.salva = function (livro, callback) {
    this._connection.query('insert into livros (titulo, preco, descricao) values (?, ?, ?)', [livro.titulo, livro.preco, livro.descricao], callback);
}

// Funçao que busca por id
ProdutoDao.prototype.pesquisa = function(id, callback) {
    this._connection.query('select * from livros where id = ?', [ id ], callback);
}

module.exports = function() { return ProdutoDao };