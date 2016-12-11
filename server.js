var md5=require('md5');
var express=require('express');
var bodyParser=require('body-parser');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var db=require('./db/db.js');
var routes=require('./routes/patient.js');

var jwtSecret = 'fjkdlsajfoew239053/3uk';

var app=express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressJwt({ secret: jwtSecret }).unless({ path: ['/','/login']}));

app.get('/',function(req,res){res.sendFile('index.html');});

function authenticate(req, res, next) {
  console.log("Login Body "+JSON.stringify(req.body));
  var body = req.body;
  if (!body.username || !body.password) {
    res.status(400).end('Must provide username or password');
  }

  var encrypted_password=md5(req.body.password);
  console.log("Encrypting Password "+encrypted_password);
  db.query('SELECT * FROM users where username=? and password=?',[req.body.username,encrypted_password],function(err, rows) {

       if(rows.length==0){
         console.log("User does not exist");
         res.status(401).end('Username or password incorrect');
       }else{
          next();
       }

  });

}

app.post('/login', authenticate, function (req, res) {
    console.log("Successfully authenticated");
    var token = jwt.sign({
      username: req.body.username
    }, jwtSecret);
    res.send({
      token: token,
      username: req.body.username
    });
});

app.post('/patient',routes.add_patient);

var port = process.env.PORT || 7000;

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});
