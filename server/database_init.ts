import { con } from "./db_connection.js";

export function initializeDatabase() {
  return new Promise<void>((resolve, reject) => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS user_table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login DATETIME DEFAULT CURRENT_TIMESTAMP,
        blocked BOOLEAN DEFAULT FALSE,
        UNIQUE INDEX unique_username (username),
        UNIQUE INDEX unique_email (email),
      )
    `;

    con.query(createTableQuery, function (err, result) {
      if (err) {
        reject(err);
        return;
      }
      console.log("Table created successfully");
      resolve();
    });
  });
}
