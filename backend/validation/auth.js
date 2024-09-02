const { check, validationResult } = require('express-validator');

const validateSignup = [
  check('username').not().isEmpty().withMessage('Username required').trim().escape(),
  check('email').isEmail().withMessage('Email invalid').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('Password under 6 chars'),
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = Object.fromEntries(result.errors.map((err) => [err.path, err.msg])); // converts data structure to whats needed on frontEnd
      return res.status(400).json({ errors });
    }
    next();
  },
];

module.exports = { validateSignup };
