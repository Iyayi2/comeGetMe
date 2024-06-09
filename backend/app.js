const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const User = require('./models/user');

const MONGODB_URI = process.env.MONGO_KEY
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // configured to accept credentials from front end for session cookies to work
  credentials: true,
}));

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  connectionStateRecovery: {}
});

io.on('connection', (socket) => {

  const socketId = socket.id
  console.log('user logged in:' + ' ' + socketId);
  // socket.on('disconnect', () => {
  //   console.log('user disconnected:', socketId)
  // });

  socket.on('content', (msg) => {
    io.emit('content', msg);
  });

});

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

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

// app.set('views', 'views');
// app.set('view engine', 'ejs');

const marketRoutes = require('../backend/routes/market');
const adminRoutes = require('../backend/routes/admin');
const authRoutes = require('../backend/routes/auth');
const messageRoutes = require('../backend/routes/message');
const user = require('../backend/models/user');
const { Socket } = require('dgram');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use(marketRoutes);
app.use(adminRoutes);
app.use(authRoutes);
app.use(messageRoutes);


mongoose.connect(MONGODB_URI)
.then(result => {
  server.listen(3000);
  console.log('connected!');
})
.catch(err => {
  console.log(err);
})
