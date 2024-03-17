const mongoose = require('mongoose');

const fileHelper = require('../util/file');

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
};

exports.getEditProduct = (req, res, next) => {
  const id = req.params.productId;

  Product.findById(id)
  .then(product => {
    res.render('admin/edit-product', {
      Product: product,
      pageTitle: 'Edit Product',
      path: '/edit-product/:productId'
    })
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  const updatedImg = req.file.path;

  Product.findById(id)
  .then(product => {
    product.title = updatedTitle
    product.price = updatedPrice
    product.description = updatedDesc
    product.imageUrl = updatedImg
    return product.save()
    .then(result => {
      console.log('Product updated!!');
      res.redirect('/my-product');
    })
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getProducts = (req, res, next) => {

  Product.find({userId: '65f006afebb3eee1aa2068dd'})
  .then(product => {
    res.render('admin/my-product', {
      Products: product,
      pageTitle: 'My products',
      path: '/my-product'
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId
  Product.findById(id)
  .then(product => {
    fileHelper.deleteFile(product.imageUrl);
    return product.deleteOne({_id: id, userId: '65f006afebb3eee1aa2068dd'})
  })
  .catch(err => {
    console.log(err);
  });
};
