const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('../models/user');
const { userDetails } = require('../util/userDetails');

exports.getLogin = (req, res, next) => {
  if (req.session.user) {
    res.status(200).json(userDetails(req.session.user));
  } else {
    res.status(401).json({ message: 'No user logged in' });
  }
};

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email: email.trim() })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ email: 'invalid' });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res.status(500).json({ ...err, message: 'bscrypt error' });
        }
        if (!result) {
          return res.status(401).json({ password: 'invalid' });
        }

        req.session.user = user;
        req.session.save((err) => {
          if (err) {
            return res.status(500).json({ ...err, message: 'session save failed' });
          }
          res.status(200).json(userDetails(user));
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ ...err, message: 'last catch block error' });
    });
};

exports.postSignup = (req, res, next) => {
  const { username, email, password } = req.body;

  bcrypt
    .hash(password, saltRounds)
    .then((hashedPassword) => {
      const user = new User({ username, email, password: hashedPassword });
      return user.save();
    })
    .then((user) => {
      req.session.user = user; // Set new user as session user on creation
      res.status(200).json(userDetails(user));
    })
    .catch((err) => {
      let errors = err;
      if (err.keyPattern) {
        const entry = Object.keys(err.keyPattern)[0]; // converts mongoose code 11000 errors to frontend friendly format
        errors = { [entry]: 'exists' };
      }
      res.status(400).json(errors);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json(null); // clear state in frontend
  });
};
