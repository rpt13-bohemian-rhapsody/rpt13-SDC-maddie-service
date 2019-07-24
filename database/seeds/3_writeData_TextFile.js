const generateFakeData = require('./fakerGenerateData');
const fs = require('fs');

const option = "insert"; //insert, copy,

function generateSellers() {
  var stream = fs.createWriteStream("../seeds/loadFiles/seller_create.txt");
  stream.once("open", (fd) => {
    for (let id = 1; id <= 1000000; id++) {

      let sellerData = generateFakeData.Sellers();
      let sellerStr = 'INSERT INTO sellers(name) VALUES("' + sellerData.name + '");\n';
      stream.write(sellerStr);
    }
    stream.end();
  });
}


function generateProducts() {
  var stream = fs.createWriteStream("../seeds/loadFiles/products_create.txt");
  stream.once("open", (fd) => {
    for (let id = 1; id <= 1000000; id++) {
      for (var j = 0; j <= 5; j++) {
        let productData = generateFakeData.Products();
        let productStr = 'INSERT INTO products(name, description, product_price, seller_id) VALUES ("' + productData.name + '", "' + productData.description + '", "' + productData.product_price + '", ' + id + ');\n';
        stream.write(productStr);
      }
    }
    stream.end();
  });
}

generateSellers();
generateProducts();