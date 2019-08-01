const faker = require("faker");
const env = require('../../env/setup');
//faker.setLocale("en_US");

faker.seed(123);

var Sellers = function () {
  var name = faker.name.findName();

  return {
    name: name
  };

};

var Products = function () {
  var name = faker.commerce.productName();
  var description = faker.commerce.productAdjective();
  var product_price = faker.commerce.price();
  var seller_id = faker.random.number(env.maxPrimary);

  return {
    name: name,
    description: description,
    product_price: product_price,
    seller_id: seller_id
  };
};



module.exports = {
  Sellers: Sellers,
  Products: Products
};