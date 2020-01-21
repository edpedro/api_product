const express = require('express');

const app = express();
const router = express.Router();

const route = router.get('/api', (req, res, next) => {
  res.status(200).send({
    title: "Api em Nodejs",
    version: "0.1"
  });
});

app.use('/', route);

module.exports = app;