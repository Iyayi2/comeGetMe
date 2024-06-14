const express = require('express');

const marketController = require('../controllers/market');

const router = express.Router();


router.get('/', marketController.getIndex);

router.get('/products', marketController.getProducts);

router.get('/products/populated', marketController.getPopulatedProducts);







module.exports = router;
