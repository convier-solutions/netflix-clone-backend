const { db } = require("../Config/dbConnection");

const createUserTable = `
    CREATE TABLE IF NOT EXISTS user ( 
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`;

const createMovieTable = `
      CREATE TABLE IF NOT EXISTS movie_data (
        id INT AUTO_INCREMENT PRIMARY KEY,
        image_url VARCHAR(255) NOT NULL, 
        title VARCHAR(255) NOT NULL,
        publishing_year INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;

async function runMigration() {
  db.query(createUserTable, (error, result) => {
    if (error) {
      console.error("Error creating user table:", error.message);
    } else {
      console.log("User table created successfully.");
    }
  });

  db.query(createMovieTable, (error, result) => {
    if (error) {
      console.error("Error creating movie table:", error.message);
    } else {
      console.log("Movie table created successfully.");
    }
  });

  db.end();
}

runMigration();
