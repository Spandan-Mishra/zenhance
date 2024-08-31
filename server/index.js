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
  const filePath = path.join(__dirname, 'database/users.json');
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
            "points": 0,
            "tasks": [],
            "coins": 0,
            "tags": [],
            "journal": []
        }
        users.database.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8', (err, data) => {
            if(err) {
                return res.status(400).json({msg: "Error writing the file"})
            }
        })

        return res.status(200).json({msg: "User registered successfully!"});
    }
  })
})

app.post('/login', (req,res) => {
    const filePath = path.join(__dirname, 'databse/users.json');
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

app.get('/my-space', auth, (req, res) => {
    const filePath = path.join(__dirname, 'databse/users.json');
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error reading the file"});
        }

        const users = JSON.parse(data);
        const userSpaceData = ( ({ username, tasks, journal }) => ({ username, tasks, journal }))(users.database.filter((user) => user.username === localStorage.getItem("currenUser"))[0]); 
        return res.status(200).json(userSpaceData);
    })
})

app.post('/my-space', auth, (req, res) => {
    const filePath = path.join(__dirname, 'database/users.json');
    const task = req.body.task;
    const journalEntry = req.body.entry;

    if(!task && !journalEntry) {
        return res.status(400).json({msg: "Enter element to add"});
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error occured"});
        }

        const users = JSON.parse(data);
        const currentUser = localStorage.getItem("currentUser");
        let currentUserData = users.database.filter((user) => user.username === currentUser)[0]; 
        
        if(task) {
            const newTask = {
                id: currentUserData.tasks.length + 1,
                task: task,
                status: false,
                favourite: false
            } 

            currentUserData.tasks.push(newTask);
            
        } else {
            const newEntry = {
                id: currentUserData.journal.length+1,
                content: journalEntry,
            }

            currentUserData.journal.push(newEntry);
        }

        users.database.map((user) => 
            user.username === currentUser ? currentUserData : user
        )
            
        const updatedUsers = JSON.stringify(users, null, 2);

        fs.writeFile(filePath, updatedUsers, 'utf-8', (err) => {
            if(err) {
                res.status(404).json({msg: "Error occured"});
            } else {
                res.status(200).json({client:{msg: "Todo added successfully!"}, users:updatedTodos});
            }
        })
    })
})

app.get('/store', auth, (req, res) => {
    const usersPath = path.join(__dirname, 'database/users.json');
    const storePath = path.join(__dirname, 'database/store.json')
    let coins;
    let sectionData = [];
    fs.readFile(storePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error reading the file"});
        }

        sectionData = JSON.parse(data);
    })

    fs.readFile(usersPath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error reading this file"});
        }

        const users = JSON.parse(data);
        const currentUser = localStorage.getItem("currentUser");
        coins = users.database.filter((user) => (user.username === currentUser))[0].coins;
    })

    res.status(200).json({
        tags: sectionData.tags,
        avatars: sectionData.avatars,
        coins: coins,
    });
})

app.post('/store', auth, (req,res) => {
    const usersPath = path.join(__dirname, 'database/users.json');
    const storePath = path.join(__dirname, 'database/store.json');

    let coins;
    const tag = req.body.tag;
    const avatar = req.body.avatar;

    if(!tag && !avatar) {
        res.status(400).json({msg: "Enter entity to buy"})
    }

    fs.readFile(usersPath, 'utf-8', (err, data) => {
        if(err) {
            res.status(400).json({msg: "Error reading the file"});
        }

        const users = JSON.parse(data);
        const currentUser = localStorage.getItem("currentUser");
        const currentUserData = users.database.filter((user) => (user.username === currentUser))[0];
        const coins = currentUserData.coins; 

        if(tag) {
            if(coins < tag.cost) {
                res.status(400).json({msg: "You dont have enough zens"});
            } 

            currentUserData.coins -= tag.cost;
            currentUserData.tags.push(tags.content);
        } else {
            if(coins < avatar.cost) {
                res.status(400).json({msg: "You dont have enough zens"});
            }

            currentUserData.coins -= avatar.cost;
            currentUserData.avatars.push(avatar.content);
        }

        users.database.map((user) => 
            user.username === currentUser ? currentUserData : user
        )

        const updatedUsers = JSON.stringify(users, null, 2);

        fs.writeFile(usersPath, updatedUsers, 'utf-8', (err, data) => {
            if(err) {
                res.status(400).json({msg: "Error writing to file"});
            }
        })
    })

app.get('/profile', auth, (req, res) => {
   const filePath = path.join(__dirname, 'database/users.json'); 

   fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            res.status(400).json({msg: "Error in reading file"})
        }

        const users = JSON.parse(data);
        const userProfileData = ( ({ username, coins, points, tags }) => ({ username, coins, points, tags }))(todos.database.filter((user) => user.username === localStorage.getItem("currenUser"))[0]); 
        res.status(200).json(userProfileData);
   })
})

})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});