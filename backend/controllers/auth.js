const mongoose = require('mongoose');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  // res.render('auth/login', {
  //   pageTitle: 'Login',
  //   path: '/login'
  // });
  console.log('[GET Login session]', req.session); // LogData
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.json({ message: 'No user logged in' });
  }
};

exports.postLogin = (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      if (user.password !== password) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      req.session.user = user;
      console.log('[POST Login session]', req.session); // LogData
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ message: 'Session save failed' });
        }
        res.status(200).json({ message: 'Login successful', user });
      });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server error', error: err });
    });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/signup',
  });
};

exports.postSignup = (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  user.save()
    .then((user) => {
     res.status(200).json(user);
     // return res.redirect('/login');
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.postLogout = (req, res, next) => {
  console.log('[POST Logout session 1]', req.session); // LogData
  req.session.destroy((err) => {
    if (err) {
      console.log('[POST Logout session 2]', req.session); // LogData
      //  res.redirect('/');
      return res.status(500).json({ message: 'Logout failed' });
    }
    console.log('[POST Logout session 3]', req.session); // LogData
    res.status(200).json({ message: 'Logout successful' });
  });
};
