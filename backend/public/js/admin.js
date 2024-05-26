const deleteProduct = btn => {
  const prodId = btn.parentNode.querySelector('[name=productId]').value;

  const productElement = btn.closest('article');

  fetch('/my-product/' + prodId, {
    method: 'DELETE'
  })
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log(data);
      productElement.parentNode.removeChild(productElement);
    })
    .catch(err => {
      console.log(err);
    });
};
