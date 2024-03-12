const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const User = require('./models/user');
const Product = require('./models/product');

const MONGODB_URI = 'mongodb+srv://iyayi:SeicBp1HHMn4SHsS@cluster0.vcq9hrr.mongodb.net/comeGetMe';
const app = express();

app.set('views', 'views');
app.set('view engine', 'ejs');

const marketRoutes = require('./routes/market');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(marketRoutes);

// User.create({username: 'nrma', email: 'norma@gmail.com', password: '123456'});

Product.create({title: 'Ball', price: 12.9,
description: 'best ball you would ever play!',
imageUrl: 'https://t4.ftcdn.net/jpg/00/25/09/41/360_F_25094192_U1f6loH9hmhMKkfkKriGbuXwqX8PyfII.jpg', userId: '65f006afebb3eee1aa2068dd'});

mongoose.connect(MONGODB_URI)
.then(result => {
  app.listen(3000);
  console.log('connected!');
})
.catch(err => {
  console.log(err);
})
