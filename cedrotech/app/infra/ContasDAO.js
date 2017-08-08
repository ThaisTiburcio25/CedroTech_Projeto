function ContasDAO(connection){
    this._connection = connection;
}
ContasDAO.prototype.lista = function(callback){
    this._connection.query('select * from conta', callback);
}

ContasDAO.prototype.selecionaConta = function(contaId,callback){
    this._connection.query('select con.*, cat.descricao as nomeCategoria from conta con, categoria cat where cat.id = con.categoria and con.id = ? ', contaId, callback);
}

ContasDAO.prototype.atualizaConta = function(contas,callback){
console.log(contas);
    this._connection.query('update conta set descricao=?, valor=? where id = ? ', [contas.descricao[1], contas.valor,contas.descricao[0]], callback);
}

ContasDAO.prototype.salva = function(contas,callback){
    this._connection.query('insert into conta set ?', contas,callback);
}

ContasDAO.prototype.deleta = function(contaId,callback){
    this._connection.query('delete from conta where id = ?', contaId,callback);
}

ContasDAO.prototype.listaCat = function(callback){
    this._connection.query('select * from categoria', callback);
}
    module.exports = function(){
    return ContasDAO;
   
}
