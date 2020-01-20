const express = require('express');
const http = require('http');
const debug = require('debug')('nodestr:server');
var port = process.env.PORT || 8000; 

const app = express();

const router  = express.Router(); 

app.get('/', (req, res, next) =>{
  res.status(200).send({
    title: "Api em Nodejs",
    version: "0.1"
  });
});

app.use('/api', router);

app.listen(port);
console.log('Servidor ON na porta ' + port);