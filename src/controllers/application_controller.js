const pool = require('../../db_connection')
const queries = require('../queries/queries')

const getAllApplications = (req, res) => {
    pool.query(queries.getAllApplications, (error, results) => {
        if (error) throw error;

        return res
        .status(200)
        .json({
                success: true,
                data: [results.rows]
        })
    })
}

module.exports = {
    getAllApplications
}