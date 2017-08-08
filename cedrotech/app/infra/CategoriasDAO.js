function CategoriasDAO(connection){
    this._connection = connection;
}
CategoriasDAO.prototype.lista = function(callback){
    this._connection.query('select * from categoria', callback);
}

CategoriasDAO.prototype.salva = function(categorias,callback){
    this._connection.query('insert into categoria set ?', categorias,callback);
}
    module.exports = function(){
    return CategoriasDAO;
   
}