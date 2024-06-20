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
      res.status(500).json(err);
    });
};

// '/product/:productId'
exports.getProductById = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .populate('userId', 'username')
    .then(product => {
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(product);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    });
};

// '/my-products'
exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// '/edit-product/:productId'
exports.putEditProduct = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
    .then((product) => {
      product.updateOne({ $set: req.body });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// '/delete-product/:productId'
exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      fileHelper.deleteFile(product.imageUrl);
      product.deleteOne({ _id: id, userId: req.user._id });
      res.status(200).json('Product deleted!');
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
