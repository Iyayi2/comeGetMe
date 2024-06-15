const mongoose = require('mongoose');

const fs = require('fs');

const fileHelper = require('../util/file');

const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  // res.render('admin/add-product', {
  //   pageTitle: 'Add product',
  //   path: '/add-product',
  // });
};

exports.postAddProduct = (req, res, next) => {
  const title       = req.body.title.trim();
  const price       = req.body.price.trim();
  const description = req.body.description.trim();
  const userId      = req.user._id;
  const imageUrl    = req.file && req.file.path;

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

// exports.postEditProduct = (req, res, next) => {
//   const id = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedDesc = req.body.description;
//   const updatedImg = req.file.path;

//   Product.findById(id)
//   .then(product => {
//     product.title = updatedTitle
//     product.price = updatedPrice
//     product.description = updatedDesc
//     product.imageUrl = updatedImg
//     return product.save()
//     .then(result => {
//       console.log('Product updated!!');
//       res.redirect('/my-product');
//     })
//   })
//   .catch(err => {
//     console.log(err);
//   })
// };

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.user._id })
    .then((product) => {
      res.status(200).json(product);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

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
