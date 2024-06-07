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
      res.render('auth/login');
    }
    req.session.user = user;
    req.session.save(user => {
      res.status(200).json(user)
      // return res.redirect('/products');
    })
  })
  .catch(err => {
    res.status(500).json(err)
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
