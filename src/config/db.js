const { Pool } = require("pg")

module.exports = new Pool({
    user: 'postgres',
    password: '001lucaspinho',
    host: 'localhost',
    port: 5432,
    database: 'gymmanager'
})