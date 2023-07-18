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

        const ApplicationExists = results.rows.length;
        if (ApplicationExists) return res.status(404).json({success: false, message: "This user already exists"});

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
            (error) => {
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
    const { id } = req.params;
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
            (error) => {
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

        pool.query(queries.deleteApplicationById, [id], (error) => {
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
            pool.query(queries.updateApplicationColumnByID(column), [updatedColumn, id], (error) => {
                if (error) throw error;

                return res.status(200).json({success: true, message: "Application column updated"})
            })
        })
    })
}

const getApplicationsByCompanyName = (req, res) => {
    const { company_name } = req.query;
    if (!company_name || company_name === '' ){
        res
        .status(404)
        .json(
            {
                success: false,
                message: "Can not find any applications with this name"
            }
        )
    }
    pool.query(queries.getApplicationsByCompanyName, [company_name], (error, results) => {
        if (error) throw error;
        return res.status(200).json({success: true, data: results.rows})
    })
}

const determineQuery = (column, searchInput) => {
    const paramsToRun = []
    if (searchInput === "" || searchInput === undefined) {
        if (!column) return;
        paramsToRun.push(column);
    } else {
        // what to do now, atp there is onthy the search input in the array
        //
        paramsToRun.push(searchInput);
        if (!column) return;
        paramsToRun.push(column);
    }
    return paramsToRun;
}   


const searchByJobSiteAndDynamicColumn = (req, res) => {
    const { column, site } = req.query;
    const queryToRun = determineQuery(column, site)

    if (queryToRun === undefined) {
        res
            .status(404)
            .json(
                {
                    success: false,
                    message: "There is a set search input query, but no dynamic column query provided"
                }
            );
    }

    switch(queryToRun.length){
        case 1:
            pool.query('SELECT * FROM application ORDER BY ' + queryToRun[0] + ' ASC', (error, results) => {
                if (error) throw error;
                res.status(200).json({success: true, data: results.rows})
            })
        break;
        case 2:
            pool.query('SELECT * FROM application WHERE site = \'' + queryToRun[0] + '\' ORDER BY ' + queryToRun[1] + ' ASC', (error, results) => {
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
    searchByJobSiteAndDynamicColumn
}