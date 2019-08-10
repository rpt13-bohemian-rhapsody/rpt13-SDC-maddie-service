const fs = require('fs');
const path = require('path');
const transform = require('stream-transform');
const async = require('async');
const csv = require('csv-parser');
const env = require('../env/setup');
let sellersFilePath = path.join(__dirname, '..', '/database/seeds/datacsv/seller_create.csv');
let productsFilePath = path.join(__dirname, '..', '/database/seeds/datacsv/product_create.csv');

//Cassandra
const cassandra = require('cassandra-driver');
const loadBalancingPolicy = new cassandra.policies.loadBalancing.RoundRobinPolicy();
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider(env.dbUser, env.dbPassword),
  policies: { loadBalancing: loadBalancingPolicy }
});



let insertSQL = "INSERT INTO amzservice.sellers (id, name) VALUES (uuid(), ?)";

client.connect()
  .then(() => {
    return client.execute("CREATE KEYSPACE IF NOT EXISTS amzservice WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' }");
  })
  .then(() => {
    console.log('created keyspace');
    return client.execute('CREATE TABLE IF NOT EXISTS amzservice.sellers (id uuid, name text, PRIMARY KEY(id));');
  })
  .then(() => {
    console.log('sellers created');
    return client.execute(' CREATE TABLE IF NOT EXISTS amzservice.products (id uuid, name text, description text, product_price decimal, seller_id uuid, PRIMARY KEY(id));');
  })
  .then(() => {
    console.log("created products");
    //INSERT Statement
    // return fs.readFile(sellersFilePath, (err, data) => {
    //   if (err) {
    //     console.log("error reading file " + err);
    //     throw err;
    //   } else {
    //     console.log(data.toString().substring(1, 100));
    //     return client.execute(data.toString());
    //   }
    // })
    return client.execute("COPY amzservice.sellers (id, name) FROM '" + sellersFilePath + "' WITH DELIMITER=',' AND WITH HEADER = FALSE;")
  })
  .catch((err) => {
    console.log("error creating tables " + err);
    process.exit();
  });

const executeQuery = (strQuery, data, hints) => {
  return client.execute(strQuery, data, hints);
}


module.exports.executeQuery = executeQuery;


/*

 sstableloader //https://www.datastax.com/dev/blog/using-the-cassandra-bulk-loader-updated

 Cassandra BulkLoader //https://www.datastax.com/dev/blog/using-the-cassandra-bulk-loader-updated

function execute(query, params, callback) {
  return new Promise((resolve, reject) => {
    client.execute(query, params, (err, result) => {
      if(err) {
        reject()
      } else {
        callback(err, result);
        resolve()
      }
    });
  });
}

//Execute the queries
var query = 'SELECT * FROM * WHERE name=? ALLOW FILTERING';
var q1 = execute(query, ['oranges'], (err, result) => {});
Promise.all([q1]).then(() => {
  console.log('exit');
  process.exit();
});
*/