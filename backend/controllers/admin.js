const mongoose = require('mongoose');

const fs = require('fs');

const fileHelper = require('../util/file');

const Product = require('../models/product');
const { trimWhiteSpace } = require('../util/trimWhiteSpace');

// '/add-product'
exports.postAddProduct = (req, res, next) => {
  const { title, price, description } = trimWhiteSpace(req.body);
  const userId   = req.user._id;
  const imageUrl = req.file?.path;

  const product = new Product({ title, price, description, imageUrl, userId });
  product
    .save()
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      if (req.file) {
        fs.unlinkSync(req.file.path); // Remove the uploaded file if form validation fails
      }
      let errors = {};
      for (key in err.errors) { // converts mongoose errors into more easily consumable frontend object
        errors[key] = err.errors[key].kind === 'Number' ? 'non-numeric' : err.errors[key].kind;
      }
      res.status(400).json(errors);
    });
};

// '/product/:productId'
exports.getProductById = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .populate('userId', 'username')
    .then((product) => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ ...err, message: 'getProductById Error' });
    });
};

// '/my-products'
exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json({ ...err, message: 'my-products fetch error' });
    });
};

// '/edit-product/:productId'
exports.putEditProduct = (req, res, next) => {
  const id = req.params.productId;
  const { title, price, description } = trimWhiteSpace(req.body);
  const imageUrl = req.file?.path;

  Product.findById(id).then(async (product) => {
    const oldImageUrl = product.imageUrl;

    try {
      await product
        .updateOne({ $set: { title, price, description, imageUrl } }, { runValidators: true })
        .exec();
      if (imageUrl && oldImageUrl !== imageUrl) {
        fs.unlinkSync(oldImageUrl);
      }
      const product_1 = await Product.findById(id).populate('userId', 'username');
      res.status(200).json(product_1);
    } catch (err) {
      if (imageUrl) {
        fs.unlinkSync(imageUrl);
      }
      let errors = {};
      for (key in err.errors) { // converts mongoose errors into more easily consumable frontend object
        errors[key] = err.errors[key].kind;
      }
      if (err.kind === 'Number') { // alternate err object structure to POST if price is not a number
        errors.price = 'non-numeric';
      }
      res.status(400).json(errors);
    }
  });
};

// '/delete-product/:productId'
exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .then((product) => {
      fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: id, userId: req.user._id });
    })
    .then(() => {
      res.status(200).json(null); // must be empty for frontend response
    })
    .catch((err) => {
      res.status(500).json({ ...err, message: 'delete product error' });
    });
};
