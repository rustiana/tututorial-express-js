var express = require('express');
var app = express();

app.get('/hello', function(req, res){
   res.send("Hello denrus!");
});
app.get('/denrus/:name', function(req, res){
   res.send("denrus!"+req.params.name);
});

app.listen(3000);