psql -d postgres -U postgres

CREATE ROLE my_user WITH LOGIN PASSWORD 'root';

ALTER ROLE my_user CREATEDB;

\q
psql -d postgres -U my_user

CREATE DATABASE my_database;

GRANT ALL PRIVILEGES ON DATABASE my_database TO my_user;

CREATE TABLE users( id SERIAL PRIMARY KEY, name VARCHAR(30), email VARCHAR(30) );

