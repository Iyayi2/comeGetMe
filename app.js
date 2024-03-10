const express = require('express');
const app = express();

const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://cluster0.vcq9hrr.mongodb.net/comeGetMe';

app.get('/', (req, res, next) =>{
  res.send('Hello World');
})

mongoose.connect(MONGODB_URI)
.then(result => {
  app.listen(3000);
  console.log('connected!');
})
.catch(err => {
  console.log(err);
})
