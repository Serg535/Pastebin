const mysql = require('mysql2/promise');
let text = 'Jack'
let age = 33

async function main() {
  try {
    // Connect to the database using promises
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'username',
      password: 'password',
      database: 'first_db'
    });
    
    console.log('Connected to MySQL Database!');
    
    await connection.execute(`INSERT INTO user (name, age) VALUES ('${text}', ${age})`)

    // Execute a query using promise
    const [rows, fields] = await connection.execute('SELECT * FROM user');
    console.log('Query Result:', rows);
    
    // Close the connection
    await connection.end();
  } catch (err) {
    console.error('Error:', err);
  }
}

main();