var db=require('../db/db.js');

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
