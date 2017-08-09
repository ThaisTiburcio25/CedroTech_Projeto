module.exports = function(app){ //Define das rotas - chamada de paginas
app.get('/contas/deleteConta/:uid', function (req, res) {

 var connection = app.infra.connectionFactory(); //abre conexao
    var contasDAO =  new app.infra.ContasDAO(connection);
    contasDAO.deleta(req.params.uid, function(erros,resultados){
       console.log(erros);
        res.redirect('/contas');
        });
connection.end(); 
});



app.get('/contas/edita/:uid', function (req, res) {

 var connection = app.infra.connectionFactory(); //abre conexao
    var contasDAO =  new app.infra.ContasDAO(connection);
    contasDAO.selecionaConta(req.params.uid, function(erros,resultados){
	var resultado = resultados[0];

       console.log(resultado);

 res.render('contas/edit',
            {errosValidacao:{},contas: {'id': resultado.id, 'descricao': resultado.descricao, 'valor': resultado.valor, 'categoria': resultado.nomeCategoria ,'categoriaId': resultado.categoria }});  

        });
connection.end(); 
});


    app.get('/contas',function(req,res,next){
    var connection = app.infra.connectionFactory(); //abre conexao
    var contasDAO =  new app.infra.ContasDAO(connection);
    var categoriasDAO = new app.infra.CategoriasDAO(connection);
	



    contasDAO.lista(function(erros,resultados){
        if(erros){
            return next(erros); 
        }
        res.format({
            html: function(){
                res.render('contas/lista',{lista:resultados});
            },
            json: function(){
                res.json(resultados);
            }
        });
    });

        connection.end(); //fecha conexao

        
 });

    app.get('/contas/form', function(req,res){
	var connection = app.infra.connectionFactory(); //abre conexao
    var categoriasDAO =  new app.infra.CategoriasDAO(connection);
    categoriasDAO.lista(function(erros,resultados){
        if(erros){
            return next(erros); 
        }
        res.format({
            html: function(){
                res.render('contas/form',{contas:{}, listaCategorias : resultados,errosValidacao:{}});
            },
            json: function(){
                res.json(resultados);
            }
        });
    });

    connection.end(); //fecha conexao


});


app.post('/contas/atualizar',function(req,res){
    
    var contas = req.body;
    console.log(contas);
   req.assert('descricao','Descricao é obrigatoria').notEmpty();
   req.assert('valor','Formato invalido').isFloat();

   var erros = req.validationErrors();
   if(erros){
       res.format({
            html: function(){
                 res.status(400).render('contas/edit',{errosValidacao:erros,contas:contas});
            },
            json: function(){
                res.status(400).json(erros);
            }
        });   
        return;
   }

    var connection = app.infra.connectionFactory(); //abre conexao
    var contasDAO =  new app.infra.ContasDAO(connection);
    contasDAO.atualizaConta(contas, function(erros,resultados){
       console.log(erros);
        res.redirect('/contas');
        });
connection.end(); 
});

app.post('/contas',function(req,res){
    
    var contas = req.body;
    
   req.assert('descricao','Descricao é obrigatoria').notEmpty();
   req.assert('valor','Formato invalido').isFloat();

   var erros = req.validationErrors();
   if(erros){
       res.format({
            html: function(){
                 res.status(400).render('contas/form',{errosValidacao:erros,contas:contas});
            },
            json: function(){
                res.status(400).json(erros);
            }
        });   
        return;
   }

    var connection = app.infra.connectionFactory(); //abre conexao
    var contasDAO =  new app.infra.ContasDAO(connection);
    contasDAO.salva(contas, function(erros,resultados){
       console.log(erros);
        res.redirect('/contas');
        });
});
}

