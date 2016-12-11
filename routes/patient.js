var db=require('../db/db.js');

db.query('SELECT patient_name FROM patients',function(err, rows) {
    console.log(rows[0].patient_name+"    "+rows[1].patient_name);
});

exports.add_patient=function(req,res){

                  console.log(req.body);
                  var patient = req.body;
                  db.query('INSERT INTO patients SET ?', patient, function(err,result){
                    if(err) {throw err;}
                    else{
                      console.log('Inserted successfully');
                      res.status(200).end('Record inserted successfully');
                    }
                  });
}
