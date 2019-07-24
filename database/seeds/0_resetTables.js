const generateFakeData = require('./fakerGenerateData');
const db = require('../../database');
const env = require('../../env/setup');
//require('../../newrelic');

function clearTables() {
  db.runAnyStatement('DROP TABLE IF EXISTS products;DROP TABLE IF EXISTS sellers;CREATE TABLE IF NOT EXISTS sellers(id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);CREATE TABLE IF NOT EXISTS products(id SERIAL PRIMARY KEY, name VARCHAR, description VARCHAR, product_price NUMERIC(10, 2) DEFAULT 0, seller_id INT, FOREIGN KEY(seller_id) REFERENCES sellers(id));', (res, err) => {
    if (err) {
      console.log("error " + err);
    } else {
      console.log("Completed clearTables");
    }
  });
}


clearTables();
