const express = require('express');
const path = require('path');
const queryDatabase = require('../database/index.js').queryDatabase;
const queryAllFromDatabase = require('../database/index.js')
  .queryAllFromDatabase;
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use('/products/:id', express.static(path.join(__dirname, '/client/dist')));

app.get('/product/:id', (req, res) => {
  console.log("/product/:id");
  queryDatabase(req.params.id, (result) => {
    res.send(result);
  });
});

app.get('/getallproducts', (req, res) => {
  console.log("/getallproducts");
  queryAllFromDatabase((result, successBool) => {
    res.send(result.concat({ title: `Passed: ${successBool}`, id: 01 }));
  });
});

app.get('/', (req, res) => {
  res.send("url /product/1 products/1")
});

app.listen(port, () =>
  console.log(`App connection successful! App hosted at port: ${port}`)
);
