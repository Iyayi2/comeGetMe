const express = require('express');

const authController = require('../controllers/auth');
const { validateSignup } = require('../validation/auth');


const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.post('/logout', authController.postLogout);
router.post('/signup', validateSignup, authController.postSignup);

module.exports = router
