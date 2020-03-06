const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express();

//Conexao
mongoose.connect('mongodb+srv://eduardo:34860760Du@api-product-qzzao.mongodb.net/test?retryWrites=true&w=majority')

//Models
const Product = require('./models/Product')
const Customer = require("./models/customer")
const order = require("./models/order")
//Rotas
const indexRouter = require("./routes/index")
const productRouter = require("./routes/product")
const customerRouter = require("./routes/customer")
const orderRouter = require("./routes/order")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', indexRouter);
app.use('/api/products', productRouter);
app.use('/api/customers', customerRouter);
app.use('/api/orders', orderRouter);


module.exports = app;