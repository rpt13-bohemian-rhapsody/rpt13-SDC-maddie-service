# Item Name, Description, and Options with Price

### Installing Dependencies

From within the root directory: `npm install`

### Starting service

From the root of the service folder, run `npm start`.

### POSTGRES DATABASE

##### Make sure postgres is installed on your computer
https://www.postgresql.org/download/macosx/

```console
node -v postgressql
brew info postgres
```

##### Postgres setup

**Start Postgres**
- run SQL Shell (psql).app, from the psql postgres prompt

**Create database**
```console
node database/createDatabase.js
```

**Create Tables**
```postgres SQL Shell (psql).app
\c amz-service
\i <direcory_path>\createTables.sql
```

**Quick help**
`\1` - lists all schemas (databases)
`\c dbName` - use that dbName schema
`\dn` -  List of schemas
`\dt` - tables in the schema
`\dt dbName` - tables in the dbName schema
`\dt` - tables in the schema

Structure
- Databases
  |- Database
    |- Schemas
      |- Schema
        |- Tables
          |- Table

### MongoDB Schema

```
let productInfoSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: String,
  description: String,
  product_price: Number,
  seller: String,
  colors: Array,
});
```

### Seeding Script

To seed the database with 100 items matching the datashape of the above schema run: `npm run seedDb`

### API

Get one item from database: `/product/id`

### Render Specific Product (Front End)

To render a specific product on the frontend, simply hit this endpoint: `/products/id`

It will render this services' App and make a call to `/product/id` automatically to fetch the required data.
