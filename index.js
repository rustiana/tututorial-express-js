var express = require('express');
var app = express();

app.get('/', function(req, res){
   res.send("Hello denrus!");
});

app.listen(3000);