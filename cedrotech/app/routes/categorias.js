module.exports = function(app){ //Define das rotas - chamada de paginas
    app.get('/categorias',function(req,res,next){
    var connection = app.infra.connectionFactory(); //abre conexao
    var categoriasDAO =  new app.infra.CategoriasDAO(connection);
    categoriasDAO.lista(function(erros,resultados){
        if(erros){
            return next(erros); 
        }
        res.format({
            html: function(){
                res.render('categorias/lista',{lista:resultados});
            },
            json: function(){
                res.json(resultados);
            }
        });
    });

    connection.end(); //fecha conexao
});

    app.get('/categorias/form', function(req,res){
        res.render('categorias/form',
            {errosValidacao:{},categorias:{}});  
});

app.post('/categorias',function(req,res){
    
    var categorias = req.body;
    
   req.assert('descricao','Descricao é obrigatoria').notEmpty();

   var erros = req.validationErrors();
   if(erros){
       res.format({
            html: function(){
                 res.status(400).render('categorias/form',{errosValidacao:erros,categorias:categorias});
            },
            json: function(){
                res.status(400).json(erros);
            }
        });   
        return;
   }

    var connection = app.infra.connectionFactory(); //abre conexao
    var categoriasDAO =  new app.infra.CategoriasDAO(connection);
    categoriasDAO.salva(categorias, function(erros,resultados){
       console.log(erros);
        res.redirect('/categorias');
        });
});
}

// app.get('contas/remove',function(){
//     var connection = app.infra.connectionFactory();
//     var contasBanco = app.infra.contasBanco(connection);
//     var contas = contasBanco.carrega(id,callback);

//     if(contas){
//         contasBanco.remove(contas,callback);
//     }
// })
