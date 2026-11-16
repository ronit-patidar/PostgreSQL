const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

module.exports = pool;

// max: 10: allow up to 10 connections in this pool.
// idleTimeoutMillis: close an unused connection after the configured idle period.
// connectionTimeoutMillis: wait up to 2 seconds to acquire a connection.