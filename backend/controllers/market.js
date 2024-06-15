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

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
      // res.render('market/index', {
      //   Products: products,
      //   pageTitle: 'Market',
      //   path: '/'
      // });
    })
    .catch((err) => {
      res.status(500).json(err);
      // console.log(err);
    });
};
