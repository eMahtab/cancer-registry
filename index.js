/*var db=require('./db/db.js');




db.query('SELECT patient_name FROM patients',function(err, rows) {

    console.log(rows[0].patient_name+"    "+rows[1].patient_name);
}
);


var patient = { patient_name: 'Kmre' };
db.query('INSERT INTO patients SET ?', patient, function(err,res){
  if(err) throw err;

  console.log('Last insert ID:', res.insertId);
});*/

var db=require('./db/db.js');
var express=require('express');
var bodyParser=require('body-parser');
var cors = require('cors');
var app=express();

var routes=require('./routes/patient.js');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');

//app.use(express.static(__dirname + '/public'));


//app.get('/',routes.home);
app.post('/patient',routes.add_patient);
app.use(function(req, res) {
      res.status(400);
     res.render('404');
  });

var port = process.env.PORT || 8080;



//var port = process.env.PORT || 7000;

var server=app.listen(port,function(req,res){
    console.log("Catch the action at http://localhost:"+port);
});
