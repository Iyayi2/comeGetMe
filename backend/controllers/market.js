const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
  .then(products => {
    res.status(200).json(products);
    // res.render('market/product-list', {
    //   Products: products,
    //   pageTitle: 'Products',
    //   path: '/products'
    // });
  })
  .catch(err => {
    res.status(500).json(err);
    // console.log(err);
  })
};

exports.getUserProducts = (req, res, next) => {
  const userId = req.params.userId;

  Product.find({ userId: userId }) 
    .then(products => {
      res.status(200).json(products);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

exports.getProduct = (req, res, next) => {
  const Id = req.params.productId;

  Product.findById(Id)
  .populate('userId', 'username')
  .then(product => {
    res.status(200).json(product);
    // res.render('market/product-detail', {
    //   Product: product,
    //   pageTitle: product.title,
    //   path: '/products/:productId'
    // });
  })
  .catch(err => {
    res.status(500).json(err);
  })
};

exports.getIndex = (req, res, next) => {
  Product.find()
  .then(products => {
    res.status(200).json(products);
    // res.render('market/index', {
    //   Products: products,
    //   pageTitle: 'Market',
    //   path: '/'
    // });
  })
  .catch(err => {
    res.status(500).json(err);
    // console.log(err);
  })
};
