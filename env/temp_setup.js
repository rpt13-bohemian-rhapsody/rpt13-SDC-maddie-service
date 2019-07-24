const DB_HOST = 'localhost';
const DB_PORT = 5432;
const DB_URL = 'postgres://localhost:5432/';
const DB_NAME = 'amz-service';
const DB_USER = 'TODO';
const DB_PASSWORD = 'TODO';
const NEWRELIC_PASSWORD = 'TODO';
const NUM_PRIMARY_RECORDS = 100;
const NUM_SECONDARY_RECORDS = 2;

module.exports = {
  dbHost: DB_HOST,
  dbPort: DB_PORT,
  dbUrl: DB_URL,
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  newRelicPassword: NEWRELIC_PASSWORD,
  maxPrimary: NUM_PRIMARY_RECORDS,
  maxSecondary: NUM_SECONDARY_RECORDS
};
