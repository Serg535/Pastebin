const mysql = require('mysql2/promise');

async function main() {
  try {
    // Connect to the database using promises
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'app_user',
      password: '',
      database: 'pastebin'
    });
    
    console.log('Connected to MySQL Database!');
    
    await connection.execute(
      'CREATE TABLE IF NOT EXISTS pastebin_data (ID INT AUTO_INCREMENT PRIMARY KEY, StartDate DATETIME DEFAULT CURRENT_TIMESTAMP, Title VARCHAR(90) DEFAULT "Untitled", Text MEDIUMTEXT, EndDate DATETIME, URL VARCHAR(50));'
    )
    await connection.execute(
      'INSERT INTO pastebin_data (Title, Text, EndDate, URL) VALUES ("Title 1", "first attempt", DATE_ADD(NOW(), INTERVAL 1 MONTH), "zzz@fff.com");'
    )

    // Close the connection
    await connection.end();
  } catch (err) {
    console.error('Error:', err);
  }
}

main();