const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: 'localhost',
    database: 'job-tracker-DB',
    password: "Asdfjkl;0987^!",
    port: "5432"
});

module.exports = pool;