const getAllApplications = "SELECT * FROM application";

const getAppById = "SELECT * FROM application WHERE ID = $1";

module.exports = {
    getAllApplications,
    getAppById
}