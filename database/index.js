const pg = require('pg');
const ENV = require('../env/setup.js');


const dbClient = new pg.Client(ENV.dbUrl + ENV.dbName);

await dbClient.connect();

/* **** **** **** **** CREATE **** **** **** **** */
//Create DATABASE
let createSellersSQL = 'CREATE TABLE IF NOT EXISTS sellers(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);';
let createProductsSQL = 'CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY, name VARCHAR, description VARCHAR, product_price NUMERIC(10, 2) DEFAULT 0, seller_id INT, FOREIGN KEY(seller_id) REFERENCES sellers(id));';

const createDatabase = dbClient.query(createSellersSQL, (err, res) => {
  if (err) {
    console.log('Error: database/index.js - createSellersSQL - ' + JSON.stringify(err));
    throw err;
  } else {
    console.log('Seller Table Created');
  }
}).then(() => {
  dbClient.query(createProductsSQL, (err, res) => {
    if (err) {
      console.log('Error: database/index.js - createProductsSQL - ' + JSON.stringify(err));
      throw err;
    } else {
      console.log('Products Table Created');
    }
  })
}).catch(e => console.error(e.stack));


//Create Seller
const insertSellersSQL = `INSERT INTO sellers(name) VALUES ($1);`;
let insertSellerValues = [];
const createSeller = function (values) {
  insertSellerValues = values;
  try {
    const { rows } = await db.query({
      text: insertSellersSQL,
      values: insertSellerValues
    });
    return rows[0];
  } catch (error) {
    return error;
  }
}


//Create Product
const insertProductsSQL = `INSERT INTO sellers(name, description, product_price, seller_id) VALUES ($1, $2, $3, $4);`;
let insertProductsValues = [];
const createProduct = function (values) {
  insertProductsValues = values;
  try {
    const { rows } = await db.query({
      text: insertProductsSQL,
      values: insertProductsValues
    });
    return rows[0];
  } catch (error) {
    return error;
  }
}


/* **** **** **** **** READ **** **** **** **** */
//READ All Sellers
//READ Specific Sellers
//READ All Products
//READ Specfic Product
//READ All Products for a Seller

/* **** **** **** **** UPDATE **** **** **** **** */
//Update a Seller
//Update a Product

/* **** **** **** **** DELETE **** **** **** **** */
//Delete a Seller
//Delete all Sellers
//Delete a Product
//Delete all Products
//Delete Tables


module.exports.createDatabase = createDatabase;
module.exports.createSeller = createSeller;
module.exports.createProduct = createProduct;