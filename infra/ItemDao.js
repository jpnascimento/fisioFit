function ItemDao (model) {
    this._model = model;
}

ItemDao.prototype.list = function(callback) {
    this._model.find(callback);
}

ItemDao.prototype.save = function (item, callback) {
    var livroModel = new this._model(item);
    itemModel.save(callback);
}

module.exports = function() { return ItemDao };
