const generateFakeData = require('./fakerGenerateData');
const db = require('../../database');
const env = require('../../env/setup');
//require('../../newrelic');
let startTime = new Date();
let priArrayNum = Array.from(Array(env.maxPrimary).keys());
let secArrayNum = Array.from(Array(env.maxPrimary * env.maxSecondary).keys());


async function generateSellers() {
  //recreate table
  priArrayNum.map(async id => {
    let sellerData = await generateFakeData.Sellers();
    // console.log("sellerData = " + JSON.stringify(sellerData));
    // break;
    const temp = await db.createSeller([sellerData.name], (res, err) => {
      if (err) {
        console.log("error " + err);
      }
    });
    if (id % 10000 === 0) {
      console.log("Completed generate [" + (id) + "] Sellers in " + ((new Date().getTime() - startTime.getTime()) / 1000));
    }
    return temp;
  });
}


async function generateProducts() {
  let i = 0;
  secArrayNum.map(async id => {
    i = Math.floor(Math.random() * Math.floor(env.maxPrimary));
    let productData = await generateFakeData.Products();

    const temp = await db.createProduct([productData.name, productData.description, productData.product_price, i], (res, err) => {
      if (err) {
        console.log("error " + err + ', ' + i + ', ' + j);
        throw err;
      }
    });

    if (id % 10000 === 0) {
      console.log("Completed generate [" + (id) + "] Products in " + ((new Date().getTime() - startTime.getTime()) / 1000));
    }
    return temp;

  });
}


generateSellers();
generateProducts();