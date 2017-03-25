function ItemDao (connection) {
    this._connection = connection;
}

// Funçao para listar os livros
ItemDao.prototype.lista = function (callback) {
    this._connection.query('select * from livros', callback);
}

// Função para inserir novo livro
ItemDao.prototype.salva = function (livro, callback) {
    this._connection.query('insert into livros (titulo, preco, descricao) values (?, ?, ?)', [livro.titulo, livro.preco, livro.descricao], callback);
}

// Funçao que busca por id
ItemDao.prototype.pesquisa = function(id, callback) {
    this._connection.query('select * from livros where id = ?', [ id ], callback);
}

module.exports = function() { return ItemDao };
