const createMovieTable = `
    CREATE TABLE IF NOT EXISTS movie_data (
      id INT AUTO_INCREMENT PRIMARY KEY,
      picture VARCHAR(255) NOT NULL, 
      title VARCHAR(255) NOT NULL,
      publishing_year INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`;

module.exports = createMovieTable;
