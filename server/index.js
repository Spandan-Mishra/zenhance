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
let currentUser = "";
let currentCollege = "";

app.post('/signup', (req, res) => {
  const filePath = path.join(__dirname, 'users.json');
  const username = req.body.username;
  const password = req.body.password;
  const college = req.body.college;

  if(!username || !password || !college) {
    return res.status(400).json({msg: "Fill all fields"});
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if(err) {
        return res.status(400).json({msg: "Error reading the file"})
    }

    const users = JSON.parse(data);

    if(users.database.some((user) => user.username === username && user.college)) {
        return res.status(403).json({msg: "User already exists"});
    } else {
        var hash = sha256(password)

        const newUser = {
            "username": username,
            "id": users.database.length+1,
            "password": hash,
            "college": college,
            "coins": 0,
            "posts": []
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
    const filePath = path.join(__dirname, 'users.json');
    const username = req.body.username;
    const password = req.body.password;
    const college = req.body.college;
    
    if(!username || !password || !college) {
        return res.status(400).json({msg: "Fill all fields"});
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error reading the file"});
        }

        const users = JSON.parse(data);
        var hash = sha256(password)

        if(users.database.some((user) => user.username === username && user.password === hash && user.college === college)) {
            currentUser = username;
            currentCollege = college;
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
    const filePath = path.join(__dirname, 'users.json');
    
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error reading the file"});
        }

        const users = JSON.parse(data);
        const collegePosts = users.database.filter((user) => (user.college === currentCollege)).map(({ username, posts }) => ({ username, posts }));
        return res.status(200).json(collegePosts);
    })
})

app.post('/my-space', auth, (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    const post = req.body.post;

    if(!post) {
        return res.status(400).json({msg: "Enter element to add"});
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            return res.status(400).json({msg: "Error occured"});
        }

        const users = JSON.parse(data);
        let currentUserData = users.database.filter((user) => user.username === currentUser)[0]; 
        
        const newPost = {
            id: currentUserData.posts.length+1,
            content: post,
            interactors: []
        }

        currentUserData.posts.push(newPost);

        users.database.map((user) => 
            user.username === currentUser ? currentUserData : user
        );

        fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8', (err, data) => {
            if(err) {
                res.status(400).json({msg: "Error writing"});
            }
        })

        res.status(200).json({msg: "Post added successfully"});
    })
})

app.put('/my-space', auth, (req, res) => {
    const filePath = path.join(__dirname, 'users.json');
    const username = req.body.username;
    const postId = req.body.id;

    fs.readFile(filePath, 'utf-8', (req, res) => {
        if(err) {
            res.status(400).json({msg: "Error in reading file"});
        }

        const users = JSON.parse(data);
        const postUserData = users.database.filter((user) => (user.username === username))[0];

        postUserData.map((post) => 
            post.id === postId ? [...post, interactors.push(username)] : post
        )

        users.database.map((user) =>
            user.username === username ? postUserData : user
        )

        fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf-8', (err, data) => {
            if(err) {
                res.status(400).json({msg: "Error in writing"});
            }
        })

        res.status(200).json({msg: "Interactor added"});
    })
})

app.get('/profile', auth, (req, res) => {
    const filePath = path.join(__dirname, 'users.json');

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if(err) {
            res.status(400).json({msg: "Error in reading file"});
        }

        const users = JSON.parse(data);
        const currentUserData = users.database.filter((user) => user.username === currentUser)[0];
        res.status(200).json(currentUserData);
    });
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});