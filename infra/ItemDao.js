function ItemDao (connection) {
    this._connection = connection;
}

// Funçao para listar os livros
ItemDao.prototype.lista = function (callback) {
    this._connection.query('select * from item', callback);
}

// Função para inserir novo livro
ItemDao.prototype.salva = function (livro, callback) {
    this._connection.query('insert into item (nome, codigo, preco, descricao, imagem) values (?, ?, ?, ?, ?)', [item.nome, item.codigo, item.preco, item.descricao, item.imagem], callback);
}

// Funçao que busca por id
ItemDao.prototype.pesquisa = function(id, callback) {
    this._connection.query('select * from item where id = ?', [ id ], callback);
}

module.exports = function() { return ItemDao };
