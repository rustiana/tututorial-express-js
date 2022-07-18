var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer();

app.use(express.static('public'));
app.use(express.static('images'));

app.set('view engine', 'pug');
app.set('views','./views');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/db_abc');

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
   res.render('form', {
      user : {
         name: 'TJ',
         email: 'tj@vision-media.ca',
         city: 'Victoria',
         province: 'BC',
       }
   });
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

var personSchema = mongoose.Schema({
   name: String,
   age: Number,
   nationality: String
});
var Person = mongoose.model("Person", personSchema);


app.get('/person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information
   
   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided worng info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });
		
      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

app.listen(3000);