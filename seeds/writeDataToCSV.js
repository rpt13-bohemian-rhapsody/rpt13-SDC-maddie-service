//Write data to CSV or text
//node --max-old-space-size=8192  writeDataToCSV.js

const generateFakeData = require('./fakerGenerateData');
const env = require('../../env/setup');
const fs = require('fs');
const path = require('path');
const Uuid = require('cassandra-driver').types.Uuid;
let startTime = new Date().getTime();
let fileExt = ".csv";

let sellersFilePath = path.join(__dirname, '..', '/seeds/datacsv/cassandra_seller_create');
let productsFilePath = path.join(__dirname, '..', '/seeds/datacsv/cassandra_product_create');

function generateSellersFileCSV() {
  //Check if file exists
  try {
    console.log("file path = " + sellersFilePath);
    if (fs.existsSync(sellersFilePath + fileExt)) {
      //file exists - do not need to re-create
      console.log('Completed generateSellersFile : ' + 'File exists');
      return;
    }

    //generate file
    var stream = fs.createWriteStream(sellersFilePath + fileExt);

    let sellerStr = "";
    stream.once('open', (fd) => {
      for (var j = 0; j < env.maxSecondary; j++) {

        for (let id = 1; id <= env.maxPrimary * env.maxSecondary; id++) {
          let sellerData = generateFakeData.Sellers();
          let id = Uuid.random();

          sellerStr += id + ',' + sellerData.name + "\n";
        }
        stream.write(sellerStr);
      }
      stream.end();
      console.log('Completed generateSellersFile : ' + 'File generated with ' + (env.maxPrimary * env.maxSecondary).toLocaleString() +
        ' # of lines. Time in seconds =  ' +
        (new Date().getTime() - startTime) / 1000);

      sellerStr = '';
    });

  }
  catch (err) {
    console.log('ERROR generateSellersFile' + JSON.stringify(err));
  }
}

function generateSellersFileCQL() {
  //Check if file exists
  try {
    fileExt = ".cql";

    console.log("file path = " + sellersFilePath);

    if (fs.existsSync(sellersFilePath + fileExt)) {
      //file exists - do not need to re-create
      console.log('Completed generateSellersFile : ' + 'File exists');
      return;
    }

    //generate file
    var stream = fs.createWriteStream(sellersFilePath + fileExt);

    let sellerStr = "";
    stream.once('open', (fd) => {
      for (let id = 1; id <= env.maxPrimary * env.maxSecondary; id++) {
        let sellerData = generateFakeData.Sellers();
        let id = Uuid.random();

        sellerStr += "INSERT INTO amzservice.sellers (id, name) VALUES ('" + id + "','" + sellerData.name + "');\n";
      }
      stream.write(sellerStr);
      stream.end();
      console.log('Completed generateSellersFile : ' + 'File generated with ' + (env.maxPrimary * env.maxSecondary).toLocaleString() +
        ' # of lines. Time in seconds =  ' +
        (new Date().getTime() - startTime) / 1000);
      sellerStr = '';
    });

  }
  catch (err) {
    console.log('ERROR generateSellersFile' + JSON.stringify(err));
  }
}

generateSellersFileCSV();
//generateSellersFileCQL();

function generateProductsFile() {
  //Check if file exists
  try {
    if (fs.existsSync(productsFilePath + fileExt)) {
      //file exists - do not need to re-create
      console.log('Completed generateProductsFile : ' + 'File exists');
      return;
    }

    //generate file
    var stream = fs.createWriteStream(productsFilePath + fileExt);

    let productStr = 'name,description,product_price,seller_id\n';
    stream.once('open', (fd) => {
      //For each seller
      for (let id = 1; id <= env.maxPrimary * env.maxSecondary; id++) {
        //5 records per seller
        for (var j = 0; j < 5; j++) {
          let productData = generateFakeData.Products();
          productStr += productData.name + ',' + productData.description + ',' + productData.product_price + ',' + id + '\n';
        }

        if (id % 100000 === 0 || id === env.maxPrimary * env.maxSecondary * 5) {
          console.log("added id " + (id * 5).toLocaleString() + ' records to csv for products');
          stream.write(productStr);
          productStr = '';
        }
      }

      stream.end();
      console.log('Completed generateProductsFile : File generated with ' + (env.maxPrimary * env.maxSecondary * 5).toLocaleString() +
        ' # of lines. Time in seconds =  ' + (new Date().getTime() - startTime) / 1000);
      productStr = '';
    });
  }
  catch (err) {
    console.log('ERROR generateProductsFile' + JSON.stringify(err));
  }
}

//generateProductsFile();