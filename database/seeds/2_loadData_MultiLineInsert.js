const generateFakeData = require('./fakerGenerateData');
const db = require('../../database');
let startTime = new Date();

function generateSellers() {
  startTime = new Date();
  let stmts = [];
  let id = 1;
  for (id = 1; id <= 100000000; id++) {
    let sellerData = generateFakeData.Sellers();
    stmts.push({
      name: sellerData.name
    });

    if (id % 100000000 === 0) {
      db.insertMultiLineSellers(stmts, (res, err) => {
        if (err) {
          console.log('error ' + err);
        } else {
          console.log("insertMultiLineSellers :2 " + (startTime.getTime() - new Date().getTime()) / 1000 + "at id = " + id);
          delete stmts;
        }
      });
    }
  }
}
//time:
//1 insert  of 10000000 =
//10 inserts of 1000000 =
//100 inserts of 100000 =
//1000 inserts of 10000 =
//10000 inserts of 1000 =
//100000 inserts of 100 =


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
          delete stmts;
          stmts = [];
        } else {
          console.log("insertMultiLineProducts :2 " + (startTime.getTime() - new Date().getTime()) / 1000 + "at id = " + id);
          delete stmts;
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

//generateProducts();
//

//node --max_old_space_size=4096 database/seeds/2_loadData_MultiLineInsert.js