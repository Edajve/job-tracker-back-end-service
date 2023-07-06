const getAllApplications = "SELECT * FROM application";

const getAppById = "SELECT * FROM application WHERE ID = $1";

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

module.exports = {
    getAllApplications,
    getAppById,
    getAppByCompanyNameAndPosition,
    addApplication
}