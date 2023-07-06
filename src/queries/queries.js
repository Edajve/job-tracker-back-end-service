const getAllApplications = "SELECT * FROM application";

const getApplicationById = "SELECT * FROM application WHERE ID = $1";

const getAppByCompanyNameAndPosition =
     "SELECT * FROM application " +
    "WHERE company_name = $1 " +
    "AND position = $2 ";

    const addApplication =
    "INSERT INTO application (" +
    "site, " +
    "date, " +
    "date_applied_to, " +
    "company_name, " +
    "position, " +
    "fulltime_contract, " +
    "salary, " +
    "company_website, " +
    "contact_info, " +
    "call_back_date, " +
    "tech_stack, " +
    "round_1, " +
    "round_2, " +
    "round_3, " +
    "final, " +
    "notes" +
    ") VALUES (" +
    "$1, " +
    "$2, " +
    "$3, " +
    "$4, " +
    "$5, " +
    "$6, " +
    "$7, " +
    "$8, " +
    "$9, " +
    "$10, " +
    "$11, " +
    "$12, " +
    "$13, " +
    "$14, " +
    "$15, " +
    "$16" +
    ")";

const updateApplication = "UPDATE application " +
    "SET " +
    "site = $1, " +
    "date = $2, " +
    "date_applied_to = $3, " +
    "company_name = $4, " +
    "position = $5, " +
    "fulltime_contract = $6, " +
    "salary = $7, " +
    "company_website = $8, " +
    "contact_info = $9, " +
    "call_back_date = $10, " +
    "tech_stack = $11, " +
    "round_1 = $12, " +
    "round_2 = $13, " +
    "round_3 = $14, " +
    "final = $15, " +
    "notes = $16 " +
    "WHERE " +
    "id = $17;";

const deleteApplicationById = "DELETE FROM application WHERE id = $1";

module.exports = {
    getAllApplications,
    getApplicationById,
    getAppByCompanyNameAndPosition,
    addApplication,
    updateApplication,
    deleteApplicationById
}