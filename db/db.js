var mysql = require("mysql");

var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "new1prog$",
          database:"cancer_registry"
        });

        db.connect(function(err){
            if(!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

/*
// First you need to create a connection to the db
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "new1prog$",
  database:"cancer_registry"
});
*/

module.exports = connectDatabase();
