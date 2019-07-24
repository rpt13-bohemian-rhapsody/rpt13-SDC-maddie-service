const pgp = require('pg-promise')();
const ENV = require('../env/setup.js');

var cn = {
  "host": ENV.dbHost,
  "port": ENV.dbPort,
  "database": ENV.dbName,
  "user": ENV.dbUser,
  "password": ENV.dbPassword
};

const dbClient = pgp(cn);
console.log("connection established");

/* **** **** **** **** CREATE **** **** **** **** */
//Create DATABASE
//let createSellersSQL = 'CREATE TABLE IF NOT EXISTS sellers(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);';
//let createProductsSQL = 'CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY, name VARCHAR, description VARCHAR, product_price NUMERIC(10, 2) DEFAULT 0, seller_id INT, FOREIGN KEY(seller_id) REFERENCES sellers(id));';
// const createDatabase = dbClient.query(createSellersSQL, (err, res) => {
//   if (err) {
//     console.log('Error: database/index.js - createSellersSQL - ' + JSON.stringify(err));
//     throw err;
//   } else {
//     console.log('Sellers Table Created');
//   }
// }).then(() => {
//   dbClient.query(createProductsSQL, (err, res) => {
//     if (err) {
//       console.log('Error: database/index.js - createProductsSQL - ' + JSON.stringify(err));
//       throw err;
//     } else {
//       console.log('Products Table Created');
//     }
//   })
// }).catch(e => console.error(e.stack));

//Run any statement
const runAnyStatement = function (stmt, cb) {
  dbClient.none(stmt)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      console.log("error in database : " + error);
      cb({}, error);
    });
}

//Multi-line Insert Sellers
//const cs = new pgp.helpers.ColumnSet(['col_a', 'col_b'], {table: 'tmp'});
//const values = [{col_a: 'a1', col_b: 'b1'}, {col_a: 'a2', col_b: 'b2'}];
//const query = pgp.helpers.insert(values, cs);
const insertMultiLineSellersCS = new pgp.helpers.ColumnSet(['name'], { table: 'sellers' });
const insertMultiLineSellers = function (values, cb) {
  const query = pgp.helpers.insert(values, insertMultiLineSellersCS);
  dbClient.none(query)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      console.log("error in database : " + error);
      cb({}, error);
    });
}

//Multi-line Insert Products
//const cs = new pgp.helpers.ColumnSet(['col_a', 'col_b'], {table: 'tmp'});
//const values = [{col_a: 'a1', col_b: 'b1'}, {col_a: 'a2', col_b: 'b2'}];
//const query = pgp.helpers.insert(values, cs);
const insertMultiLineProductsCS = new pgp.helpers.ColumnSet(['name', 'description', 'product_price', 'seller_id'], { table: 'products' });
const insertMultiLineProducts = function (values, cb) {
  const query = pgp.helpers.insert(values, insertMultiLineProductsCS);
  dbClient.none(query)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      console.log("error in database : " + error);
      cb({}, error);
    });
}

//Create Seller
const insertSellerSQL = `INSERT INTO sellers(name) VALUES ($1);`;
let insertSellerValues = [];
const createSeller = function (values, cb) {
  insertSellerValues = values;
  dbClient.none(insertSellerSQL, insertSellerValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      console.log("error in database : " + error);
      cb({}, error);
    });
}

//Create Product
const insertProductSQL = `INSERT INTO products(name, description, product_price, seller_id) VALUES ($1, $2, $3, $4);`;
let insertProductValues = [];
const createProduct = function (values, cb) {
  insertProductValues = values;
  dbClient.none(insertProductSQL, insertProductValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}


/* **** **** **** **** READ **** **** **** **** */
//READ All Sellers
const readAllSellersSQL = `SELECT * FROM sellers;`;
const readAllSellers = function (cb) {
  dbClient.any(readAllSellersSQL, [])
    .then((rows) => {
      console.log("db " + JSON.stringify(rows));
      cb(rows, null);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      cb({}, error);
    });
}

//READ Specific Sellers
const readSpecificSellerSQL = `SELECT * FROM sellers WHERE id=($1);`;
let readSpecificSellerValues = [];
const readSpecificSeller = function (values, cb) {
  readSpecificSellerValues = values;
  dbClient.one(readSpecificSellerSQL, readSpecificSellerValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

//READ All Products
const readAllProductsSQL = `SELECT * FROM products;`;
const readAllProducts = function (cb) {
  dbClient.any(readAllProductsSQL, [])
    .then((rows) => {
      console.log("db " + JSON.stringify(rows));
      cb(rows, null);
    })
    .catch((error) => {
      console.log('ERROR:', error);
      cb({}, error);
    });
}

//READ Specfic Product
const readSpecificProductSQL = `SELECT * FROM products WHERE id=($1);`;
let readSpecificProductValues = [];
const readSpecificProduct = function (values, cb) {
  readSpecificProductValues = values;
  dbClient.one(readSpecificProductSQL, readSpecificProductValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

//READ All Products for a Seller
const readProductsofSellerSQL = `SELECT * FROM products WHERE id=($1);`;
let readProductsofSellerValues = [];
const readProductsofSeller = function (values, cb) {
  readProductsofSellerValues = values;
  dbClient.any(readProductsofSellerSQL, readProductsofSellerValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

// /* **** **** **** **** UPDATE **** **** **** **** */
//Update specific Seller
const updateSpecificSellerSQL = `UPDATE sellers SET name=($2) WHERE id=($1);`;
let updateSpecificSellerValues = [];
const updateSpecificSeller = function (values, cb) {
  updateSpecificSellerValues = values;
  dbClient.none(updateSpecificSellerSQL, updateSpecificSellerValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

//Update a Product
const updateSpecificProductSQL = `UPDATE products SET name=($2), description=($3), product_price=($4), seller_id=($5) WHERE id=($1);`;
let updateSpecificProductValues = [];
const updateSpecificProduct = function (values, cb) {
  updateSpecificProductValues = values;
  dbClient.none(updateSpecificProductSQL, updateSpecificProductValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

// /* **** **** **** **** DELETE **** **** **** **** */
//Delete a Seller
const deleteSpecificSellerSQL = `DELETE FROM sellers WHERE id=($1);`;
let deleteSpecificSellerValues = [];
const deleteSpecificSeller = function (values, cb) {
  deleteSpecificSellerValues = values;
  dbClient.result(deleteSpecificSellerSQL, deleteSpecificSellerValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

//Delete all Sellers
const deleteAllSellersSQL = `DELETE FROM sellers;`;
const deleteAllSellers = function (cb) {
  dbClient.result(deleteAllSellersSQL)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

//Delete a Product
const deleteSpecificProductSQL = `DELETE FROM products WHERE id=($1);`;
let deleteSpecificProductValues = [];
const deleteSpecificProduct = function (values, cb) {
  deleteSpecificProductValues = values;
  dbClient.result(deleteSpecificProductSQL, deleteSpecificProductValues)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

//Delete all Products
const deleteAllProductsSQL = `DELETE FROM products;`;
const deleteAllProducts = function (cb) {
  dbClient.result(deleteAllProductsSQL)
    .then((rows) => {
      cb(rows, null);
    })
    .catch(error => {
      cb({}, error);
    });
}

// //Delete Tables
// const deleteTableSellersSQL = `DROP TABLE sellers CASCADE;`;
// const deleteTableSellers = function (values, cb) {
//   try {
//     const { rows } = await dbClient.query(deleteTableSellersSQL);
//     cb(null, rows);
//   } catch (error) {
//     cb(error, {});
//   }
// }

// const deleteTableProductsSQL = `DROP TABLE products CASCADE;`;
// const deleteTableProducts = function (values, cb) {
//   try {
//     const { rows } = await dbClient.query(deleteTableProductsSQL);
//     cb(null, rows);
//   } catch (error) {
//     cb(error, {});
//   }
// }



//module.exports.createDatabase = createDatabase;
module.exports.runAnyStatement = runAnyStatement;
module.exports.insertMultiLineSellers = insertMultiLineSellers;
module.exports.insertMultiLineProducts = insertMultiLineProducts;
module.exports.createSeller = createSeller;
module.exports.createProduct = createProduct;
module.exports.readAllSellers = readAllSellers;
module.exports.readSpecificSeller = readSpecificSeller;
module.exports.readAllProducts = readAllProducts;
module.exports.readSpecificProduct = readSpecificProduct;
module.exports.readProductsofSeller = readProductsofSeller;
module.exports.updateSpecificSeller = updateSpecificSeller;
module.exports.updateSpecificProduct = updateSpecificProduct;
module.exports.deleteSpecificSeller = deleteSpecificSeller;
module.exports.deleteAllSellers = deleteAllSellers;
module.exports.deleteSpecificProduct = deleteSpecificProduct;
module.exports.deleteAllProducts = deleteAllProducts;
// module.exports.deleteTableSellers = deleteTableSellers;
// module.exports.deleteTableProducts = deleteTableProducts;