var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer();

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

app.get('/form', function(req, res){
   res.render('form');
});

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.post('/', function(req, res){
   console.log(req.body);
   res.send("recieved your request!");
});

app.listen(3000);