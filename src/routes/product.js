const express = require('express');
const router = express.Router();
const ProductController = require("../controllers/ProductController")

router.post('/', ProductController.post);
router.put('/:id', ProductController.put);
router.delete('/',  ProductController.delete);

module.exports = router