const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.post('/add-product', adminController.postAddProduct);
router.get('/product/:productId', adminController.getProductById);
router.get('/my-products', adminController.getProducts);
router.put('/edit-product/:productId', adminController.putEditProduct);
router.delete('/delete-product/:productId', adminController.deleteProduct);





module.exports = router;
