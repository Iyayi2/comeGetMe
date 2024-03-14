const mongoose = require('mongoose');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add product',
    path: '/add-product'
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const price = req.body.price;
  const description = req.body.description;
  const imageUrl = req.file.path;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: '65f006afebb3eee1aa2068dd'
  });
  product.save()
  .then(result => {
    res.redirect('/products');
  })
  .catch(err => {
    console.log(err);
  })
}

exports.getProducts = (req, res, next) => {

  Product.find({userId: '65f006afebb3eee1aa2068dd'})
  .then(product => {
    res.render('admin/my-product', {
      Products: product,
      pageTitle: 'My products',
      path: '/my-product'
    });
  })
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.producId
  Product.findById(id)
  .then(product => {
    product.deleteOne({_id: id, userId: '65f006afebb3eee1aa2068dd'})
  })
  .catch(err => {
    console.log(err);
  });
}
