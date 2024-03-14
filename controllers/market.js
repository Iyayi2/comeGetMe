const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    res.render('market/product-list', {
      Products: products,
      pageTitle: 'Products',
      path: '/products'
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getProduct = (req, res, next) => {
  const Id = req.params.productId;

  Product.findById(Id)
  .then(product => {
    res.render('market/product-detail', {
      Product: product,
      pageTitle: product.title,
      path: '/products/:productId'
    });
  })
};

exports.getIndex = (req, res, next) => {
  Product.find()
  .then(products => {
    res.render('market/index', {
      Products: products,
      pageTitle: 'Market',
      path: '/'
    });
  })
  .catch(err => {
    console.log(err);
  })
};
