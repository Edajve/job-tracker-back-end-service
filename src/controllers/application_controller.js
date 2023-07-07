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

const updateApplicationColumnByID = (req, res) => {
    const { column, id } = req.params;
    const { updatedColumn } = req.body;


    //check to see if the id exits
    pool.query(queries.getApplicationById, [id], (error, results) => {
        if (error) throw error;

        const noApplicationExist = !results.rows.length

        if (noApplicationExist) return res.status(404).json({success: false, message: "This user is not available"});

        //check to see if the column exists
        pool.query(queries.doesColumnExists, [column], (error, results) => {
            if (error) throw error;

            const doesColumnExits = results.rows[0].column_exists

            if (!doesColumnExits) {
                return res.status(404).json({success: false, message: "This column is not available"})
            }

            // run update query
            pool.query(queries.updateApplicationColumnByID(column), [updatedColumn, id], (error, results) => {
                if (error) throw error;

                return res.status(200).json({success: true, message: "Application column updated"})
            })
        })
    })
}

const getApplicationsByCompanyName = (req, res) => {
    const { company_name, site } = req.query;
    pool.query(queries.getApplicationsByCompanyName, [company_name], (error, results) => {
        if (error) throw error;
        return res.status(200).json({success: true, data: results.rows})
    })
}

const determineQuery = (column, search) => {
    const paramsToRun = []
    if (search === "" || search === undefined) {
        if (!column) throw new Error("No query parameter given")
        paramsToRun.push(column);
    } else {
        paramsToRun.push(search);
        if (!column) throw new Error("No query parameter given here");
        paramsToRun.push(column);
    }
    return paramsToRun;
}   


const getApplicationsBySpecificQuery = (req, res) => {
    const { column, companyName } = req.query;
    const queryToRun = determineQuery(column, companyName)
   
    switch(queryToRun.length){
        case 1:
            pool.query('SELECT * FROM application ORDER BY ' + queryToRun[0] + ' ASC', (error, results) => {
                if (error) throw error;
                res.status(200).json({success: true, data: results.rows})
            })
        break;
        case 2:
            pool.query('SELECT * FROM application WHERE company_name = \'' + queryToRun[0] + '\' ORDER BY ' + queryToRun[1] + ' ASC', (error, results) => {
                if (error) throw error;
                res.status(200).json({success: true, data: results.rows})
            })
        break;
        default:
            res.status(400).json({success: false, message: "No parameters where passed"})
    }
}

module.exports = {
    getAllApplications, 
    getApplicationById,
    addApplication,
    updateApplication,
    deleteApplicationById,
    updateApplicationColumnByID,
    getApplicationsByCompanyName,
    getApplicationsBySpecificQuery
}