const Validator = require('../validators/validator')
const repository = require("../repositores/CustomerRepository")
const md5 = require('md5')

const emailService = require('../services/emailSerive')

exports.post = async (req, res) => {

    let validatorErro = new Validator()

    validatorErro.hasMinLen(req.body.name, 3, 'Nome deve conter pelo menos 3 caracteres')
    validatorErro.isEmail(req.body.email, 'Email invalido')
    validatorErro.hasMinLen(req.body.password, 6, 'Senha deve conter pelo menos 6 caracteres')

    //verificar ser tem erro
    if (!validatorErro.isValid()) {
        res.status(400).send(validatorErro.errors()).end();
        return;
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        })
        emailService.send(
            req.body.email,
            'Bem vindo ao node JS',
            global.EMAIL_TMPL.replace('{0}', req.body.name)
        )
        res.status(201).send({
            message: "Cliente cadastrado com sucesso!"
        });
    } catch (e) {
        res.status(400).send({
            message: "Cliente não cadastrado!",
            data: e
        });
    }
};
