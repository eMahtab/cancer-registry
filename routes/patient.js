var db=require('../db/db.js');

db.query('SELECT patient_name FROM patients',function(err, rows) {

    console.log(rows[0].patient_name+"    "+rows[1].patient_name);
}
);

exports.add_patient=function(req,res){
                /*  var aadhar=req.body.aadhar;
                  var source_of_registration=req.body.source_of_registration;
                  var date_of_registration=req.body.date_of_registration;
                  console.log("Date of registration "+ date_of_registration)
                  var patient_name=req.body.patient_name;
                  var father_name=req.body.father_name;
                  var mother_name=req.body.mother_name;
                  var spouse_name=req.body.spouse_name;
                  var department=req.body.department;*/
                  console.log(req.body);

                  var patient = JSON.parse(req.body);
                  db.query('INSERT INTO patients SET ?', patient, function(err,result){
                    if(err) {throw err;}
                    else{
                      console.log('Inserted successfully');
                      //return res.status(201).send('Record added successfully');
                      res.send(200);

                    }

                  });


              }
