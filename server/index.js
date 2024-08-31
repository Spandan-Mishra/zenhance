const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const PORT = 3000;
var jwt = require("jsonwebtoken");
const { auth } = require("./middleware");
var sha256 = require('js-sha256');
const JWT_SECRET = "secret";
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const cors = require("cors");
app.use(cors());
app.use(jsonParser);

app.post('/signup', (req, res) => {
  const filePath = path.join(__dirname, 'users.json');
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
    return res.status(400).json({msg: "Enter username and password"});
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) {
        return res.status(400).json({msg: "Error reading the file"})
    }

    const users = JSON.parse(data);
    
    if(users.database.some((user) => user.username === username)) {
        return res.status(403).json({msg: "User already exists"});
    } else {
        var hash = sha256(password)

        const newUser = {
            "username": username,
            "id": todos.database.length+1,
            "password": hash,
            "tasks": [],
            "coins": 0,
            "badges": [],
            "journal": []
        }
        users.database.push(newUser);

        fs.writeFile(filePath, JSON.stringify(todos, null, 2), 'utf-8', (err, data) => {
            if(err) {
                return res.status(400).json({msg: "Error writing the file"})
            }
        })

        return res.status(200).json({msg: "User registered successfully!"});
    }
  })
})

app.post('/login', (req,res) => {
    const filePath = path.join(__dirname, 'users.json');
    const username = req.body.username;
    const password = req.body.password;
    
    if(!username || !password) {
        return res.status(400).json({msg: "Enter username and password"});
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error reading the file"});
        }

        const users = JSON.parse(data);
        var hash = sha256(password)

        if(users.database.some((user) => user.username === username && user.password === hash)) {
            localStorage.setItem("currentUser", username);
            const token = jwt.sign({
                id: users.database.filter((user) => user.username === username)[0].id
            }, JWT_SECRET);

            return res.status(200).json({ 
                token, 
                client:{msg:"User logged in successfully!"} });
        } else {
            return res.status(403).json({msg: "Invalid credentials"});
        }
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});