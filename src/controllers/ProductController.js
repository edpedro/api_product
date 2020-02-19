const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Validator = require('../validators/validator')
const repository = require("../repositores/ProdutoRepository")

exports.get = async (req, res) => {
  try {
    var data = await repository.get()
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }

}
exports.getBySlug = async (req, res) => {
  try {
    var data = await repository.getBySlug(req.params.slug)
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
exports.getById = async (req, res) => {
  try {
    var data = await repository.getById(req.params.id)
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
exports.getByTag = async (req, res) => {
  try {
    var data = await repository.getByTag(req.params.tag)
    res.status(200).send(data)
  } catch (e) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    })
  }
}
exports.put = async (req, res) => {

  try {
    var data = await repository.update(req.params.id, req.body)
    res.status(200).send({
      message: 'Produto atualizado com sucesso!'
    })
  } catch (e) {
    res.status(400).send({
      message: "Falha ao atualizar produto",
      data: e
    })
  }
}
exports.delete = async (req, res) => {
  try {
    var data = await repository.delete(req.body.id)
    res.status(200).send({
      message: 'Produto removido com sucesso!'
    })
  } catch (e) {
    res.status(400).send({
      message: 'Falha ao remover produto',
      data: e
    })
  }
}
exports.post = async (req, res) => {

  let validatorErro = new Validator()

  validatorErro.hasMinLen(req.body.title, 3, 'Titulo deve conter pelo menos 3 caracteres')
  validatorErro.hasMinLen(req.body.slug, 3, 'Titulo deve conter pelo menos 3 caracteres')
  validatorErro.hasMinLen(req.body.description, 3, 'Titulo deve conter pelo menos 3 caracteres')

  //verificar ser tem erro
  if (!validatorErro.isValid()) {
    res.status(400).send(validatorErro.errors()).end();
    return;
  }
  try {
    await repository.create(req.body)
    res.status(201).send({ message: "Produto cadastrado com sucesso!" });
  } catch (e) {
    res.status(400).send({
      message: "Produto não cadastrado!",
      data: e
    });
  }
};
