const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const MONGODB_URI = 'mongodb+srv://iyayi:SeicBp1HHMn4SHsS@cluster0.vcq9hrr.mongodb.net/comeGetMe';
const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, "-") + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg') {
      cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('views', 'views');
app.set('view engine', 'ejs');

const marketRoutes = require('./routes/market');
const adminRoutes = require('./routes/admin');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(marketRoutes);
app.use(adminRoutes);


mongoose.connect(MONGODB_URI)
.then(result => {
  app.listen(3000);
  console.log('connected!');
})
.catch(err => {
  console.log(err);
})
