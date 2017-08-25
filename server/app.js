const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');
var counter = 0;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./build'))

var userData = [];
var counter = 0;
// add your code here
app.get('/', function(req, res) {
    res.status(200).send({status: 'ok'});
});

app.post('/checkUser', function(req, res) {
  var index;
  for (let i=0;i < userData.length;i++){
    if (userData[i].username == req.body.username && userData[i].password == req.body.password) {
      index = i;
    } 
  }
  console.log(userData[index].totalScore);
  if (index >= 0) {
    res.status(200).json(userData[index]);
  } else {
    res.status(404).send('Username or password is incorrect');
  } 
});

app.post('/addUser', function(req, res) {
  var obj = req.body;
  let newUser = true;
  for (let i=0;i<userData.length;i++){
    if (userData[i].username == obj.username) {
      newUser = false;
    }
  }
  if (!newUser) {
    res.status(500).send(newUser)
  } else {
    obj.id = counter;
    counter += 1;
    userData.push(obj);
    console.log(userData);
    res.status(200).json(req.body);
  }
});

app.post('/saveUserData',(req, res) => {
  var obj = req.body;
  var index;
  for (let i=0;i < userData.length;i++){
    if (userData[i].username == obj.username) {
      index = i;
    }  
  }
  if (index >= 0) {
    userData[index].totalScore = obj.totalScore;
    res.status(200).json(userData[index]);
  } else {
    res.status(404).send('Username does not exist');
  } 
})

module.exports = app;
