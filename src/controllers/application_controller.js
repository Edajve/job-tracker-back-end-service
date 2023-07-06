const pool = require('../../db_connection')
const queries = require('../queries/queries')

const getAllApplications = (req, res) => {
    pool.query(queries.getAllApplications, (error, results) => {
        if (error) throw error;

        return res
        .status(200)
        .json({
                success: true,
                data: results.rows
        })
    })
}

const getApplicationById = (req, res) => {
    const { id } = req.params;

    pool.query(queries.getApplicationById, [id], (error, result) => {
        if (error) throw error;

        res.status(200)
        .json(
            {
                success: true,
                data: result.rows
            }
        )
    })
}

const addApplication = (req, res) => {
    const body = req.body;

    pool.query(
        queries.getAppByCompanyNameAndPosition, 
        [body.company_name, body.position],
        (error, results) => {
        if (error) throw error;

        const ApplicationExists = results.rows.length

        if (ApplicationExists) return res.status(404).json({success: false, message: "This user already exists"})

        //add application
        pool.query(queries.addApplication, 
            [
                body.site,
                body.date,
                body.date_applied_to,
                body.company_name,
                body.position,
                body.fulltime_contract,
                body.salary,
                body.company_website,
                body.contact_info,
                body.call_back_date,
                body.tech_stack,
                body.round_1,
                body.round_2,
                body.round_3,
                body.final,
                body.notes
            ],
            (error, results) => {
                if (error) throw error

                res.status(201)
                .json(
                    {
                        success: true,
                        message: "Application successfully created"
                    }
                )
            }
        )
    })
}

const updateApplication = (req, res) => {
    const { id } = req.params
    const body = req.body;

    pool.query(queries.getApplicationById, [id], (error, results) => {
        if (error) throw error;

        const noApplicationExist = !results.rows.length

        if (noApplicationExist) return res.status(404).json({success: false, message: "This user is not available"})
        
        pool.query(queries.updateApplication, 
            [
                body.site,
                body.date,
                body.date_applied_to,
                body.company_name,
                body.position,
                body.fulltime_contract,
                body.salary,
                body.company_website,
                body.contact_info,
                body.call_back_date,
                body.tech_stack,
                body.round_1,
                body.round_2,
                body.round_3,
                body.final,
                body.notes,
                id
            ],
            (error, result) => {
                if (error) throw error;

                res.status(201)
                .json(
                    {
                        success: true,
                        message: "Application successfully updated"
                    }
                )
            }
        )
    })
}

const deleteApplicationById = (req, res) => {
    const { id } = req.params

    pool.query(queries.getApplicationById, [id], (error, results) => {
        if (error) throw error;

        const noApplicationExist = !results.rows.length

        if (noApplicationExist) return res.status(404).json({success: false, message: "This user is not available"})

        pool.query(queries.deleteApplicationById, [id], (error, results) => {
            if (error) throw error;

            res.status(200)
            .json(
                {
                    success: true,
                    message: "Application successfully deleted"
                }
            )
        })
    })
}

module.exports = {
    getAllApplications, 
    getApplicationById,
    addApplication,
    updateApplication,
    deleteApplicationById
}