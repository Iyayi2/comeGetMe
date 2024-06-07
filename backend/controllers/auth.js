const mongoose = require('mongoose');

const User = require('../models/user');


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login'
  });
};


exports.postLogin = (req, res, next) => {
const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password
  
  User.findOne({email: email})
    .then(user => {
      if (!user) {
        // If user is not found, send a 404 status with an error message.
        return res.status(404).json({ message: 'User not found' });
      }

      // Assuming password is hashed and needs to be compared with stored hash.
      if (user.password !== password) { // Replace with proper password comparison
        // Invalid password, send a 401 status with an error message.
        return res.status(401).json({ message: 'Incorrect password' });
      }

      // User authenticated successfully, set session or return user data
      req.session.user = user;
      req.session.save(err => {
        if (err) {
          return res.status(500).json({ message: 'Session save failed' });
        }
        res.status(200).json({ message: 'Login successful', user });
      });
    })
    .catch(err => {
      res.status(500).json({ message: 'Server error', error: err });
    });
};


exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/signup'
  })
};

exports.postSignup = (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = new User({
    username: username,
    email: email,
    password: password
  });
  user.save()
  .then(user => {
    res.status(200).json(user);
    // return res.redirect('/login');
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    // res.redirect('/');
  })
}
