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
      return res.render('auth/login');
    }
    req.session.user = user;
    return req.session.save(err => {
      console.log(err);
      res.redirect('/products');
    })
  })
  .catch(err => {
    console.log(err);
  })
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
    console.log(user);
    res.redirect('/login');
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  })
}
