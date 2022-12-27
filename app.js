var express = require('express');
var path = require('path');
const app = express();
const PORT = process.env.PORT || 3030;

var fs = require('fs');
var alert = require('alert');
const { uptime } = require('process');
const { Console } = require('console');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req,res){
  res.render('login');
});
var userx;
var usery;

app.post('/login', function(req,res){
  var x = req.body.username;
  var y = req.body.password;
 registerque(x,y,res);
 
});

app.post('/home', function(req, res){
  var x = req.body.username;
  userx = req.body.username;
  usery = req.body.password;
  var y = req.body.password;
  loginque(x,y,res);
});

app.get('/islands', function(req,res){
  res.render('islands');
});
app.get('/annapurna', function(req,res){
  res.render('annapurna');
});
app.get('/bali', function(req,res){
  res.render('bali');
});
app.get('/cities', function(req,res){
  res.render('cities');
});
app.get('/hiking', function(req,res){
  res.render('hiking');
});
app.get('/home', function(req,res){
  res.render('home');
});
app.get('/inca', function(req,res){
  res.render('inca');
});
app.get('/paris', function(req,res){
  res.render('paris');
});
app.get('/registration', function(req,res){
  res.render('registration');
});
app.get('/rome', function(req,res){
  res.render('rome');
});
app.get('/santorini', function(req,res){
  res.render('santorini');
});
app.get('/searchresults', function(req,res){
  res.render('searchresults');
});
app.get('/wanttogo', function(req,res){
  viewlist(res);
  // res.render('wanttogo', {list: str }); 
});

var MongoClient = require('mongodb').MongoClient;


function loginque (user,pass,res){
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
  if (err) throw err;
  if (user == "admin" && pass == "admin")
  res.render('home');
  else{

  
  var db = client.db('myDB');

  db.collection('myCollection').find({username: user , password: pass}).toArray(function (err, results){
    if (results.length != 0){
      res.render('home');
      
    }
    else{

      alert("User doesn't exist");
  }
  });}
});
}

function registerque (user, pass, res){
  if(user.length == 0 || pass.length == 0)
  alert('Please type a valid username and password');
  else{

  
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').find({username: user}).toArray(function (err, results){

      if (results.length == 0){
        db.collection('myCollection').insertOne({username: user, password: pass, destinations: []});
        res.render('login');
        alert("Registration successful");
      }
      else{
        alert("Username already exists");
      }
    });
  });
  }
}

function viewlist (res){
  var string1= new Array();
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
    if (err) throw err;
    var db = client.db('myDB');
 
  db.collection('myCollection').find({username: userx, password: usery},{projection: {_id:0, username:0 , password:0}}).toArray(function (err, results){
    var desttemp = results[0].destinations;
    var l = desttemp.length;
    string1.push( desttemp[0]);
  for (var i = 1; i < l; i++) {
    string1 .push(desttemp[i]);
}  
 console.log(string1);
 res.render('wanttogo', {list: string1 });
 });
  });

}
function search (input, res){
  var places = ['Inca Trail to Machu Picchu', 'Annapurna Circuit', 'Rome', 'Paris', 'Bali Island', 'Santorini Island']
  var pagesnames = ['inca','annapurna', 'rome', 'paris', 'bali',  'santorini' ]
  var searchresults = []
  var correspondingpages = []
  for (let i = 0; i<6; i++){
    if (places[i].toLowerCase().includes(input.toLowerCase())) {
      searchresults.push(places[i]);
      correspondingpages.push(pagesnames[i]); 
  }}
  if (searchresults.length == 0 || input == "") {
    alert("Destination not found");
    res.redirect('home');
}
else {
    console.log(searchresults);
    res.render('searchresults', { place: searchresults, pages: correspondingpages });
}
}
app.post('/search', function (req, res) {
  var input = req.body.Search;
  search(input, res)
});

app.post('/bali', function(req,res){
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('myCollection').find({username: userx, password: usery},{projection: {_id:0, username:0 , password:0}}).toArray(function (err, results){
      var desttemp = results[0].destinations;
      var exists = false;
      var len = desttemp.length;
      for (let i =0; i< len; i++){
        if( desttemp[i]== "Bali"){
          exists = true;
        }
      }
      if (exists){
        alert("Destination already added")
      }
      else{
        desttemp.push('Bali');
        db.collection('myCollection').updateOne({username: userx, password: usery},{$set: {destinations: desttemp}});
      }
      });

        
});
});

app.post('/annapurna', function(req,res){
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
  if (err) throw err;
  var db = client.db('myDB');
  db.collection('myCollection').find({username: userx, password: usery},{projection: {_id:0, username:0 , password:0}}).toArray(function (err, results){
    var desttemp = results[0].destinations;
    var exists = false;
      var len = desttemp.length;
      for (let i =0; i< len; i++){
        if( desttemp[i]== "annapurna"){
          exists = true;
        }
      }
      if (exists){
        alert("Destination already added")
      }
      else{
        desttemp.push('annapurna');
        db.collection('myCollection').updateOne({username: userx, password: usery},{$set: {destinations: desttemp}});
      }
  });
});
});

app.post('/inca', function(req,res){
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
  if (err) throw err;
  var db = client.db('myDB');
  db.collection('myCollection').find({username: userx, password: usery},{projection: {_id:0, username:0 , password:0}}).toArray(function (err, results){
    var desttemp = results[0].destinations;
    var exists = false;
      var len = desttemp.length;
      for (let i =0; i< len; i++){
        if( desttemp[i]== "inca"){
          exists = true;
        }
      }
      if (exists){
        alert("Destination already added")
      }
      else{
        desttemp.push('inca');
        db.collection('myCollection').updateOne({username: userx, password: usery},{$set: {destinations: desttemp}});
      }
  });
});
});

app.post('/rome', function(req,res){
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
  if (err) throw err;
  var db = client.db('myDB');
  db.collection('myCollection').find({username: userx, password: usery},{projection: {_id:0, username:0 , password:0}}).toArray(function (err, results){
    var desttemp = results[0].destinations;
    var exists = false;
      var len = desttemp.length;
      for (let i =0; i< len; i++){
        if( desttemp[i]== "rome"){
          exists = true;
        }
      }
      if (exists){
        alert("Destination already added")
      }
      else{
        desttemp.push('rome');
        db.collection('myCollection').updateOne({username: userx, password: usery},{$set: {destinations: desttemp}});
      }
  });
});
});

app.post('/paris', function(req,res){
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
  if (err) throw err;
  var db = client.db('myDB');
  db.collection('myCollection').find({username: userx, password: usery},{projection: {_id:0, username:0 , password:0}}).toArray(function (err, results){
    var desttemp = results[0].destinations;
    
    var exists = false;
      var len = desttemp.length;
      for (let i =0; i< len; i++){
        if( desttemp[i]== "paris"){
          exists = true;
        }
      }
      if (exists){
        alert("Destination already added");
      }
      else{
        desttemp.push('paris');
        db.collection('myCollection').updateOne({username: userx, password: usery},{$set: {destinations: desttemp}});
      }
  });
});
});

app.post('/santorini', function(req,res){
MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client){
  if (err) throw err;
  var db = client.db('myDB');
  db.collection('myCollection').find({username: userx, password: usery},{projection: {_id:0, username:0 , password:0}}).toArray(function (err, results){
    var desttemp = results[0].destinations;
    var exists = false;
      var len = desttemp.length;
      for (let i =0; i< len; i++){
        if( desttemp[i]== "santorini"){
          exists = true;
        }
      }
      if (exists){
        alert("Destination already added")
      }
      else{
        desttemp.push('santorini');
        db.collection('myCollection').updateOne({username: userx, password: usery},{$set: {destinations: desttemp}});
      }
  });
});
});


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});