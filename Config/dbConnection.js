const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test@123",
  database: "db_netflix",
});

const connectDb = () => {
  db.connect((error) => {
    if (error) {
      console.error("Failed to connected with database.", error.message);
    } else {
      console.log("Database Connected Successfully");
    }
  });
};

module.exports = { db, connectDb };
