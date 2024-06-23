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

// router.get('/edit-product/:productId', adminController.getEditProduct);
// router.post('/edit-product', adminController.postEditProduct);
