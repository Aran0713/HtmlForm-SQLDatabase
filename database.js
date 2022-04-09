import mysql from "mysql";
var connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "sangeethkeke",
    database: "datatest"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Node connected to mysql server");
});

export default connection;