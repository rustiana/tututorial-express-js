var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(express.static('images'));

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/hello', function(req, res){
   res.send("Hello denrus!");
});
app.get('/denrus/:name', function(req, res){
   res.send("denrus!"+req.params.name);
});

app.get('/first_template', function(req, res){
   res.render('first_view', {
      name: "TutorialsPoint", 
      url:"http://www.tutorialspoint.com"
   });
});

app.get('/home', function(req, res){
   res.render('home',{
      user: {name: "Ayush", age: "20"}
   });
});

app.get('/components', function(req, res){
   res.render('content');
});



app.listen(3000);