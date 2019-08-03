const env = require('../env/setup');
const cassandra = require('cassandra-driver');
//const authProvider = new cassandra.auth.PlainTextAuthProvider(env.dbUser, env.dbPassword);
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1',
  authProvider: new cassandra.auth.PlainTextAuthProvider(env.dbUser, env.dbPassword)
});

client.execute('CREATE TABLE IF NOT EXISTS amzservice.sellers (id uuid, name text, PRIMARY KEY(id));')
  .then(() => {
    console.log('sellers created');
    client.execute(' CREATE TABLE IF NOT EXISTS amzservice.products (id uuid, name text, description text, product_price decimal, seller_id uuid, PRIMARY KEY(id));', (err, result) => {
      if (err) {
        console.log("error creating products " + err);
        process.exit();
      } else {
        console.log("products created " + result);
      }
    })
  })
  .catch((err) => {
    console.log("error creating sellers " + err);
    process.exit();
  });



module.exports.cassandraClinet = client;


/*

copy to/from CSV files

 cassandra-loader //https://github.com/brianmhess/cassandra-loader

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