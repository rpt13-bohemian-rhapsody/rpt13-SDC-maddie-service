//NOTE: 'copy' is a cqlsh(shell) command rather than a CQL(protocol) command
//Doesnt work

const cassandraClient = require('../database/index').cassandraClient;
const env = require('../env/setup');
const fs = require('fs');
var path = require('path');

let startTime = new Date().getTime();

let sellersFilePath = path.join(__dirname, '..', '/seeds/datacsv/seller_create.csv');
let productsFilePath = path.join(__dirname, '..', '/seeds/datacsv/product_create.csv');

cassandraClient.execute('COPY amzservice.sellers (id, name) FROM "' + sellersFilePath + '" WITH HEADER=true;')
  .then(() => {
    console.log('sellers created');
  })
  .catch((err) => {
    console.log("error creating sellers " + err);
    process.exit();
  });



