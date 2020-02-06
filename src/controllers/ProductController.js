const mongoose = require('mongoose');
const Product = mongoose.model("Product");

exports.get = (req, res, next) => {
  Product.find({ active: true }, 'title price slug').then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}
exports.getBySlug = (req, res, next) => {
  Product.findOne({slug: req.params.slug, active: true }, 'title descripton price slug tags').then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}
exports.getById = (req, res, next) => {
    Product.findById(req.params.id).then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}


exports.post = (req, res) => {
  var product = new Product();
  product.title = req.body.title
  product.slug = req.body.slug
  product.description = req.body.description
  product.price = req.body.price
  product.active = req.body.active
  product.tags = req.body.tags

  product.save().then(x => {
    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  }).catch(e => {
    res.status(400).send({
      message: "Produto não cadastrado!",
      data: e
    });
  })
};

exports.put = (req, res, next) => {
  const id = req.params.id
  res.status(201).send({
    id: id,
    item: req.body
  });
};

exports.delete = (req, res, next) => {
  res.status(200).send(req.body);
};