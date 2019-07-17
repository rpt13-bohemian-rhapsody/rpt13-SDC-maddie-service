DROP TABLE products;
DROP TABLE sellers;

CREATE TABLE sellers (id SERIAL PRIMARY KEY, name VARCHAR NOT NULL);

CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR, description VARCHAR, product_price NUMERIC(10,2) DEFAULT 0, seller_id INT, FOREIGN KEY(seller_id) REFERENCES sellers(id));
