const { db } = require("../Config/dbConnection");

const createUserTable = () => {
  const createTable = `
    CREATE TABLE IF NOT EXISTS user ( 
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`;

  db.query(createTable, (error, result) => {
    if (error) {
      console.error("Error creating user table:", error.message);
    } else {
      console.log("Successfully creating user table");
    }
  });
};

module.exports = createUserTable;
