const express = require('express');
const path = require('path');
const queryDatabase = require('../database/index.js');
const queries = require('../database/index.js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

//Create Seller
app.post('/seller', (req, res) => {
  console.log("createSeller data " + req.query.name);
  queryDatabase.createSeller([req.query.name], (result, error) => {
    if (error) {
      res.send("Error creating Seller : " + error);
    } else {
      console.log("createSeller result " + JSON.stringify(result));
      res.send("Created Seller : " + result);
    }
  });
});

//Create Product
app.post('/product', (req, res) => {
  console.log("createProduct data " + req.query.name);
  queryDatabase.createProduct([req.query.name, req.query.description, req.query.price, req.query.seller], (result, error) => {
    if (error) {
      res.send("Error creating Product : " + error);
    } else {
      console.log("createProduct result " + JSON.stringify(result));
      res.send("Created Product : " + result);
    }
  });
});

//Read All Sellers
app.get('/sellers', (req, res) => {
  queryDatabase.readAllSellers((result, error) => {
    if (error) {
      res.send("Error Read All Sellers : " + error);
    } else {
      console.log("readAllSellers result " + JSON.stringify(result));
      res.send("Sellers : " + JSON.stringify(result));
    }
  });
});

//Read Specific Seller
app.get('/seller/:id', (req, res) => {
  console.log("readSpecificSeller id " + req.params.id);
  queryDatabase.readSpecificSeller([req.params.id], (result, error) => {
    if (error) {
      res.send("Error Read Specific Seller : " + error);
    } else {
      console.log("readSpecificSeller result " + JSON.stringify(result));
      res.send("Seller with id = " + req.params.id + " : " + JSON.stringify(result));
    }
  });
});

//Read All Products
app.get('/products', (req, res) => {
  queryDatabase.readAllProducts((result, error) => {
    if (error) {
      res.send("Error Read All Products : " + error);
    } else {
      console.log("readAllProducts result " + JSON.stringify(result));
      res.send("Products : " + JSON.stringify(result));
    }
  });
});

//Read Specific Seller
app.get('/product/:id', (req, res) => {
  console.log("readSpecificProduct id " + req.params.id);
  queryDatabase.readSpecificProduct([req.params.id], (result, error) => {
    if (error) {
      res.send("Error Read Specific Product : " + error);
    } else {
      console.log("readSpecificProduct result " + JSON.stringify(result));
      res.send("Product with id = " + req.params.id + " : " + JSON.stringify(result));
    }
  });
});

//READ All Products for a Seller
app.get('/seller/:id/products', (req, res) => {
  console.log("readProductsofSeller id " + req.params.id);
  queryDatabase.readProductsofSeller([req.params.id], (result, error) => {
    if (error) {
      res.send("Error Read Products of Seller : " + error);
    } else {
      console.log("readProductsofSeller result " + JSON.stringify(result));
      res.send("Product(s) of Seller with id = " + req.params.id + " : " + JSON.stringify(result));
    }
  });
});

//Update Specific Seller
app.put('/seller/:id', (req, res) => {
  console.log("updateSpecificSeller id " + req.params.id);
  queryDatabase.updateSpecificSeller([req.params.id, req.query.newname], (result, error) => {
    if (error) {
      res.send("Error Update Specific Seller : " + error);
    } else {
      console.log("updateSpecificSeller result " + JSON.stringify(result));
      res.send("Seller with id = " + req.params.id + " : " + JSON.stringify(result));
    }
  });
});

//Update Specific Product
app.put('/product/:id', (req, res) => {
  console.log("updateSpecificProduct id " + req.params.id);
  queryDatabase.updateSpecificProduct([req.params.id, req.query.newname, req.query.newdesc, req.query.newprice, req.query.newseller], (result, error) => {
    if (error) {
      res.send("Error Update Specific Product : " + error);
    } else {
      console.log("updateSpecificProduct result " + JSON.stringify(result));
      res.send("Updated Product with id = " + req.params.id + " : " + JSON.stringify(result));
    }
  });
});

//Delete Specific Seller
app.delete('/seller/:id', (req, res) => {
  console.log("deleteSpecificSeller id " + req.params.id);
  queryDatabase.deleteSpecificSeller([req.params.id], (result, error) => {
    if (error) {
      res.send("Error Delete Specific Seller : " + error);
    } else {
      console.log("deleteSpecificSeller result " + JSON.stringify(result));
      res.send("Deleted Seller with id = " + req.params.id + " : " + JSON.stringify(result));
    }
  });
});

//Delete All Sellers
app.delete('/sellers', (req, res) => {
  queryDatabase.deleteAllSellers((result, error) => {
    if (error) {
      res.send("Error Delete All Sellers : " + error);
    } else {
      console.log("deleteAllSellers result " + JSON.stringify(result));
      res.send("Deleted All Sellers : " + JSON.stringify(result));
    }
  });
});

//Delete Specific Product
app.delete('/product/:id', (req, res) => {
  console.log("deleteSpecificProduct id " + req.params.id);
  queryDatabase.deleteSpecificProduct([req.params.id], (result, error) => {
    if (error) {
      res.send("Error Delete Specific Product : " + error);
    } else {
      console.log("deleteSpecificProduct result " + JSON.stringify(result));
      res.send("Deleted Product with id = " + req.params.id + " : " + JSON.stringify(result));
    }
  });
});

// module.exports.deleteAllProducts = deleteAllProducts;
//Delete All Sellers
app.delete('/products', (req, res) => {
  queryDatabase.deleteAllProducts((result, error) => {
    if (error) {
      res.send("Error Delete All Products : " + error);
    } else {
      console.log("deleteAllProducts result " + JSON.stringify(result));
      res.send("Deleted All Products : " + JSON.stringify(result));
    }
  });
});

app.listen(port, () =>
  console.log(`App connection successful! App hosted at port: ${port}`)
);
