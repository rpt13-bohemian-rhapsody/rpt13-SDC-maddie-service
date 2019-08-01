const generateFakeData = require('./fakerGenerateData');
const db = require('../../database');
const env = require('../../env/setup');
const fs = require('fs');
var path = require('path');
const copyFrom = require('pg-copy-streams').from;
const readable = require('stream').Readable;
let startTime = new Date().getTime();


let sellersFilePath = path.join(__dirname, '..', '/seeds/datacsv/seller_create.csv');
let productsFilePath = path.join(__dirname, '..', '/seeds/datacsv/product_create.csv');

function generateSellersFile() {
  //Check if file exists
  try {
    if (fs.existsSync(sellersFilePath)) {
      //file exists - do not need to re-create
      console.log('Completed generateSellersFile : ' + 'File exists');
      return;
    }

    //generate file
    var stream = fs.createWriteStream(sellersFilePath);

    let sellerStr = 'name\n';
    stream.once('open', (fd) => {
      for (let id = 1; id <= env.maxPrimary * env.maxSecondary; id++) {

        let sellerData = generateFakeData.Sellers();
        sellerStr += sellerData.name + '\n';

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

function generateProductsFile() {
  //Check if file exists
  try {
    if (fs.existsSync(productsFilePath)) {
      //file exists - do not need to re-create
      console.log('Completed generateProductsFile : ' + 'File exists');
      return;
    }

    //generate file
    var stream = fs.createWriteStream(productsFilePath);

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
          console.log("added id " + (id*5).toLocaleString() + ' records to csv for products');
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

generateSellersFile();

generateProductsFile();
