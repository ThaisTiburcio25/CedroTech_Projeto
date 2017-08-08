var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ContasController',function(){

    beforeEach(function(done){
        var conn = express.infra.connectionFactory();
        conn.query("delete from contas",function(ex,result){
            if(!ex){
                done();
            }
        });
    });
    
    it('#listagem json',function(done){
        request.get('/contas')
        .set('Accept','application/json')
        .expect('Content-Type',/json/)
        .expect(200,done); 
    });

    it('#cadastrar de novo conta com dados invalidos',function(done){
        request.post('/contas')
        .send({descricao:"",valor:100.00})
        .expect(400,done);
    });

    it('#cadastrar de novo conta com dados validos',function(done){
        request.post('/contas')
        .send({descricao:"Agua",valor:"100.00"})
        .expect(302,done);
    });

});