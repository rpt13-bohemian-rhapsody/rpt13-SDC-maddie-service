const exec = require('child_process').exec;
const env = require('../env/setup');


//let query = "echo '" + copyQuery + "' | xargs cqlsh CASSANDRA_HOST -u '" + env.dbUser + "' -p '" + env.dbPassword + "' -e";
let queryLogin = "cqlsh localhost -u cass -p '" + env.dbPassword + "'";
let queryCopy = "COPY amzservice.sellers(id, name) FROM '~/desktop/hackreactor/hr_workspace/rpt13-SDC-maddie-service/database/seeds/datacsv/cassandra_seller_create1.csv';";
let queryExit = "exit";


// var runSql1 = exec(queryLogin, (error, stdout, stderr) => {
//   console.log(stdout);
//   console.log(stderr);
//   if (error !== null) {
//     console.log(`exec error: ${error}`);
//   } else {
//     console.log("runSql1 done");
//     var runSql2 = exec(queryCopy, (error, stdout, stderr) => {
//       console.log(stdout);
//       console.log(stderr);
//       if (error !== null) {
//         console.log(`exec error: ${error}`);
//       } else {
//         console.log("runSql2 done");
//         var runSql2 = exec(queryExit, (error, stdout, stderr) => {
//           console.log(stdout);
//           console.log(stderr);
//           if (error !== null) {
//             console.log(`exec error: ${error}`);
//           } else {
//             console.log("runSql3 done");
//           }
//         });
//       }
//     });
//   }
// });

let cqlSh = "#!/bin/bash";
cqlSh += "cqlsh -f " + queryCopy + " -u cass -p  + '" + env.dbPassword + "' +  localhost";

var runSql1 = exec(cqlSh, (error, stdout, stderr) => {
  console.log(stdout);
  console.log(stderr);
  if (error !== null) {
    console.log(`exec error: ${error}`);
  } else {
    console.log("cqlSh done");
  }
});