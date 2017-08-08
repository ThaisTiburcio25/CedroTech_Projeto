//Chama drive mysql e define parametros de conexao
    var mysql = require('mysql');

    var connectMYSQL = function(){
        if(!process.env.NODE_ENV){
            return mysql.createConnection({ //abre conexao
            host : 'localhost',
            user : 'root',
            password : '123456',
            database : 'cedrotech'      
        });
    }
    if(!process.env.NODE_ENV == 'test'){
        return mysql.createConnection({ //abre conexao
            host : 'localhost',
            user : 'root',
            password : '123456',
            database : 'cedrotech'      
        });
    }
};

module.exports = function(){
    return connectMYSQL;
}
