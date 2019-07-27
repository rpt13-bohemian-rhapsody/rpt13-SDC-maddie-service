# Item Name, Description, and Options with Price

### Installing Dependencies

From within the root directory: `npm install`

### Starting service

From the root of the service folder, run `npm start`.

### POSTGRES DATABASE

#### Make sure postgres is installed on your computer
https://www.postgresql.org/download/macosx/

```console
node -v postgressql
brew info postgres
```

#### Postgres setup

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
`\c dbName` - use that dbName schema
`\dn` -  List of schemas
`\dt` - tables in the schema
`\dt dbName` - tables in the dbName schema
`\dt` - tables in the schema

Structure
- Databases <br>
  |- Database <br>
    |- Schemas <br>
      |- Schema <br>
        |- Tables <br>
          |- Table <br>


### API

Review server/postman_collection.json for more details

##### Create (POST)
Create Seller:  `/seller?name=TODO`  <br>
Create Product: `/product?name=TODO&description=TODO&price=TODO&seller=TODO`  <br>

##### Read (GET)
Get all sellers:   `/sellers`  <br>
Get one seller:    `/seller/id`  <br>
Get all products:  `/products`  <br>
Get one product:   `/product/id`  <br>

##### Update (PUT)
Update one seller:    `/seller/id?name=TODO`  <br>
Update one product:   `/product/id?name=TODO&description=TODO&price=TODO&seller=TODO`  <br>

##### Delete (DELETE)
Get all sellers:   `/sellers`  <br>
Get one seller:    `/seller/id`  <br>
Get all products:  `/products`  <br>
Get one product:   `/product/id`  <br>

### Seeding Script

To seed the database with 100 items matching the datashape of the above schema run: `TODO`

#### Seeding single inserts
```node --max_old_space_size=4096 database/seeds/1_loadData_Insert.js```



