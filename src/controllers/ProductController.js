const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Validator = require('../validators/validator')
const repository = require("../repositores/ProdutoRepository")

exports.get = (req, res) => {
  repository.get().then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}
exports.getBySlug = (req, res) => {
  repository.getBySlug().then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}
exports.getById = (req, res) => {
  repository.getById().then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}
exports.getByTag = (req, res) => {
  repository.getByTag().then(data => {
    res.status(200).send(data)
  }).catch(e => {
    res.status(400).send(e)
  })
}
exports.put = (req, res) => {
  repository.update(req.params.id, req.body).then(x => {
    res.status(200).send({
      message: 'Produto atualizado com sucesso!'
    }).catch(e => {
      res.status(400).send({
        message: "Falha ao atualizar produto",
        data: e
      })
    })
  })
}
exports.delete = (req, res) => {
  repository.delete(req.body.id).then(x => {
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    })
  }).catch(e => {
    res.status(400).send({
      message: 'Falha ao remover produto',
      data: e
    })
  })
}
exports.post = (req, res) => {

  let validatorErro = new Validator()

  validatorErro.hasMinLen(req.body.title, 3, 'Titulo deve conter pelo menos 3 caracteres')
  validatorErro.hasMinLen(req.body.slug, 3, 'Titulo deve conter pelo menos 3 caracteres')
  validatorErro.hasMinLen(req.body.description, 3, 'Titulo deve conter pelo menos 3 caracteres')

  //verificar ser tem erro
  if (!validatorErro.isValid()) {
    res.status(400).send(validatorErro.errors()).end();
    return;
  }

  repository.create(req.body).then(x => {
    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  }).catch(e => {
    res.status(400).send({
      message: "Produto não cadastrado!",
      data: e
    });
  })
};
