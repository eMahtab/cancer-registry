var mysql = require("mysql");

var db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection({
          host: "your_host",
          user: "root",
          password: "your_password",
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

module.exports = connectDatabase();
