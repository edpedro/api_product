const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = () => {
    return Product.find({
        active: true
    }, 'title price slug')
}
exports.getBySlug = () => {
    return roduct.findOne({
        slug: req.params.slug, active: true
    }, 'title descripton price slug tags')
}
exports.getById = () => {
    return Product.findById(req.params.id)
}
exports.getByTag = () => {
    return Product.find({
        tags: req.params.tag, active: true
    }, 'title description price slug tags')
}
exports.update = (id, data) => {
    return Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}
exports.delete = (id) => {
    return Product.findOneAndRemove(id)
}

exports.create = (data) => {
    var product = new Product(data);
    return product.save()
}