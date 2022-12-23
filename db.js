const Pool = require("pg").Pool;
const dbConn = new Pool({
  host: "isilo.db.elephantsql.com",
  port: "5432",
  user: "dwfpxsdr",
  password: "gP0ZeQUkCH4Sti_2fb8tT4Ey0xEo4oUZ",
  database: "dwfpxsdr",
});
module.exports = dbConn;
