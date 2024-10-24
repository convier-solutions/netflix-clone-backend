const { db } = require("../Config/dbConnection");

const createMovieTable = () => {
  const createTable = `
    CREATE TABLE IF NOT EXISTS movie_data (
      id INT AUTO_INCREMENT PRIMARY KEY,
      picture VARCHAR(255) NOT NULL, 
      title VARCHAR(255) NOT NULL,
      publishing_year INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    
    )`;

  db.query(createTable, (error, result) => {
    if (error) {
      console.error("Error creating movie table:", error.message);
    } else {
      console.log("Successfully creating movie table");
    }
  });
};

module.exports = createMovieTable;
