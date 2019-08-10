//NOTE: 'copy' is a cqlsh(shell) command rather than a CQL(protocol) command
//Doesnt work

const cassandra = require('cassandra-driver');
const cassExecuteQuery = require('../database/index').executeQuery;
const env = require('../env/setup');
const fs = require('fs');
const path = require('path');
const transform = require('stream-transform');
const async = require('async');
const csv = require('csv-parser');

let sellersFilePath = path.join(__dirname, '..', '/database/seeds/datacsv/seller_create.csv');
let productsFilePath = path.join(__dirname, '..', '/database/seeds/datacsv/product_create.csv');

let startTime = new Date().getTime();

async function processSQL() {
  let filedata = fs.createReadStream(sellersFilePath);
  
}



// async.series([
//   (next) => {
//     var csvData = fs.createReadStream(sellersFilePath);
//     var trfrm = transform((row) => {
//       console.log("row " + row.name);
//       cassExecuteQuery(insertSQL, [row.name], { prepare: true, consistency: cassandra.types.consistencies.one }, next);
//       return row;
//     });
//     trfrm.on('error', next);
//     csvData.pipe(csv()).pipe(trfrm);

//   }
// ], (err) => {
//   if (err) {
//     console.log("error " + err);
//   }
// });

// fs.createReadStream(sellersFilePath)
//   .pipe(csv())
//   .on('data', (row) => {
//     return cassExecuteQuery(
//       insertSQL,
//       [row.name],
//       {
//         hints: [null, null]
//       }
//     );
//     console.log("test " + test);
//     if (test.toString().indexOf("err") > -1) {
//       return 'end';
//     }
//     return test;
//   })
//   .on('end', () => {
//     console.log('CSV file processed');
//   });



