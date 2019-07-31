const generateFakeData = require('./fakerGenerateData');
const fs = require('fs');

const option = "insert"; //insert, copy,

function generateSellersFile() {
  let filePath = "../seeds/loadFiles/seller_create.csv"
  var stream = fs.createWriteStream(filePath);
  let sellerStr = 'name\n';
  stream.once("open", (fd) => {
    for (let id = 1; id <= 1000000; id++) {

      let sellerData = generateFakeData.Sellers();
      sellerStr += sellerData.name + '\n';

    }
    stream.write(sellerStr);
    stream.end();
  });
}

function insertSellersData() {
  let filePath = "../seeds/loadFiles/seller_create.csv"
  console.log("insert start");
  db.runAnyStatement("COPY sellers(name) FROM '" + filePath + "' DELIMITER ',' CSV HEADER;", (res, err) => {
    if (err) {
      console.log('error ' + err);
    } else {
      console.log("runAnyStatement copy : time =  " + (startTime.getTime() - new Date().getTime()) / 1000 + " res = " + JSON.stringify(res));
    }
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

generateSellersFile();
insertSellersData();

//generateProducts();