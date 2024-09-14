const express = require('express');

const marketController = require('../controllers/market');

const router = express.Router();


router.get('/', marketController.getIndex);

router.get('/listings', marketController.getListings);

router.get('/listings/populated', marketController.getPopulatedListings);







module.exports = router;
