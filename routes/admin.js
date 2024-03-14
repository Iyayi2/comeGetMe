const path = require('path');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);
router.get('/my-product', adminController.getProducts);
// router.put('/edit-product/:productId', adminController.putEditProduct);
router.delete('/my-product/:productId', adminController.deleteProduct);





module.exports = router;
