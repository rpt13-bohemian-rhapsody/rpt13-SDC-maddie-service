var pgtools = require('pgtools');
var ENV = require('../env/setup.js');

pgtools.createdb({
  user: ENV.dbUser,
  password: ENV.dbPassword,
  port: 5432,
  host: 'localhost'
}, ENV.dbName, (err, res) => {
  if (err && !~err.message.indexOf('already exists')) {
    console.log("error : dbSchema.js 1 Exists " + err);
    process.exit(-1);
  }
  if (err) {
    console.log("error : dbSchema.js 2 " + err);
  } else {
    console.log(res);
  }
});