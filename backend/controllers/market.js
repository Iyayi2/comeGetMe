const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getPopulatedProducts = (req, res, next) => {
  Product.find()
    .populate('userId', 'username')
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

// view json on http://localhost:3000/
exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json(err);
      console.log(err);
    });
};
