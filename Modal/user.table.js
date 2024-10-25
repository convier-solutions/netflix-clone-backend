const createUserTable = `
    CREATE TABLE IF NOT EXISTS user ( 
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    )`;

module.exports = createUserTable;
