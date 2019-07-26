const generateFakeData = require('./fakerGenerateData');
const db = require('../../database');
const helper = require("../../helper")
let startTime = new Date();

function generateSellers() {
  startTime = new Date();
  let stmts = [];
  for (let id = 1; id <= 10000000; id++) {
    let sellerData = generateFakeData.Sellers();
    stmts.push({
      name: sellerData.name
    });
  }
  db.insertMultiLineSellers(stmts, (res, err) => {
    if (err) {
      console.log('error ' + err);
    }
  });
}


function generateProducts() {
  startTime = new Date();
  let stmts = [];
  for (let id = 1; id <= 1000000; id++) {
    for (var j = 0; j <= 5; j++) {
      let productData = generateFakeData.Products();
      stmts.push({
        name: productData.name,
        description: productData.description,
        product_price: productData.product_price,
        seller_id: id
      });
    }
    if (id % 1000 === 0) {
      console.log("at id = " + id);
      db.insertMultiLineProducts(stmts, (res, err) => {
        if (err) {
          console.log('error ' + err);
          stmts = [];
        } else {
          console.log("insert at id = " + id);
          stmts = [];
        }
      });
    }
  }

  //  db.insertMultiLineProducts(stmts, (res, err) => {
  //     if (err) {
  //       console.log('error ' + err);
  //     }
  //     return '';
  //   }).then(() => {
  //       console.log("insertMultiLineProducts :2 " + helper.timeDiff(startTime, new Date()));
  //   });
}

generateSellers();
console.log("insertMultiLineSellers :2 " + helper.timeDiff(startTime, new Date()));
//generateProducts();
//console.log("insertMultiLineProducts :2 " + helper.timeDiff(startTime, new Date()));

