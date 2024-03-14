// const path = require('path');

const express = require('express');

const marketController = require('../controllers/market');

const router = express.Router();


router.get('/', marketController.getIndex);

router.get('/products', marketController.getProducts);

router.get('/products/:productId', marketController.getProduct);







module.exports = router;
