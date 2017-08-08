module.exports = function(app){
    app.get('/',function(req,res){
        var connection = app.infra.connectionFactory(); //abre conexao
        var contasDAO =  new app.infra.ContasDAO(connection);
        contasDAO.lista(function(erros,resultados){
            res.render('home/index',{contas:resultados});
        });
        connection.end();
    });

    
}