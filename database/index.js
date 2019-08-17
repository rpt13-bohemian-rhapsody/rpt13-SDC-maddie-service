const env = require('../env/setup');
const fs = require('fs');
const path = require('path');
const cassandra = require('cassandra-driver'); //https://www.npmjs.com/package/cassandra-driver
const loadBalancingPolicy = new cassandra.policies.loadBalancing.RoundRobinPolicy();


//Load Cassandra
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider(env.dbUser, env.dbPassword),
  policies: { loadBalancing: loadBalancingPolicy }
});

//Create Keyspace and tables if they do not exist
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
  .catch((err) => {
    console.log("error creating tables " + err);
    process.exit();
  });

//execute query passed to function
let res = {};
const executeQuery = (strQuery, data, hints) => {
  client.execute(strQuery, data, hints)
    .then((results) => {
      console.log("Completed executing query " + strQuery);
      res.status = "";
      res.data = results;
    })
    .catch((err) => {
      res.status = "error";
      res.data = err;
    })
    .finally(() => {
      return res;
    });
};

module.exports.executeQuery = executeQuery;