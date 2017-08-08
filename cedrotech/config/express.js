    var express =  require("express");
    var load =  require("express-load");
    var bodyParser = require('body-parser');
    var expressValidator = require('express-validator');
   
    module.exports = function()
    {
         var app = express();
    
        //seta o ejs
        app.use(express.static('./app/public/bootstrap-3.3.7-dist 2/')); // pasta estatica css
        app.set('view engine','ejs');
        app.set('views','./app/views');
        
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(bodyParser.json());
        app.use(expressValidator());

        
        load('routes',{cwd: 'app'})
        .then('infra')
        .into(app);

        return app;
}