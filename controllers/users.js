import { v4 as uuidv4 } from 'uuid';
import connection from "../database.js";
import express from "express";
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

// Scans database for all the users
function scanDatabase() { 
    var databaseUsers = []; // create empty array
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM datatest.person";
        connection.query(sql, function(err, results){
            databaseUsers.push(...results);
            resolve(databaseUsers)
        }); 
    })
}

// Reads the databse and prints it onto /Users
export const getUsers = (req,res) => {
   scanDatabase().then((databaseUsers) => {
       res.send(databaseUsers);
   });
}
// Reads the databse and prints the user specified in url
export const getUser = (req,res) => {
    scanDatabase().then((databaseUsers) => {
        const {id} = req.params;
        const foundUser = databaseUsers.find((databaseUsers) => databaseUsers.id == id);
        res.send(foundUser);
    });
}

// Creates new user from the html form
export const formCreateUser = (req, res) =>{
    var user = {};
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.age = req.body.age;
    user.id = uuidv4();

    var sql = "INSERT INTO datatest.person (firstname, lastname, age, id) VALUES (?,?,?,?)";
    connection.query(sql, [user.firstname,user.lastname,user.age,user.id], function(err,result){});

    res.send(`User with the name ${user.firstname} added to the database!`);
    res.end();
}
// Creates new user manually
export const createUser = (req,res) => {
    let user = req.body;
    user.id = uuidv4();

    var sql = "INSERT INTO datatest.person (firstname, lastname, age, id) VALUES (?,?,?,?)";
    connection.query(sql, [user.firstname,user.lastname,user.age,user.id], function(err,result){});

    res.send(`User with the name ${user.firstname} added to the database!`);
}

// Deletes user specified from url
export const deleteUser = (req,res) => {
    var {id} = req.params;

    var sql = 'DELETE FROM datatest.person WHERE id = ?';
    connection.query(sql, [id], function(err, result){});

    res.send(`User with the id ${id} is deleted from database`);
}

// Updates user spcified from url 
export const updateUser = (req,res) =>{
    const {id} = req.params;
    var updateData = req.body; 

    if (updateData.firstname){
        var sql = `Update datatest.person SET firstname = ? WHERE id = ?`;
        connection.query(sql, [updateData.firstname, id], function(err, result){});
    }
    if (updateData.lastname){
        var sql = `Update datatest.person SET lastname = ? WHERE id = ?`;
        connection.query(sql, [updateData.lastname, id], function(err, result){});
    }
    if (updateData.age){
        var sql = `Update datatest.person SET age = ? WHERE id = ?`;
        connection.query(sql, [updateData.age, id], function(err, result){});
    }

    res.send(`User with the id ${id} has been updated`);
}


