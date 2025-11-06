import mysql from 'mysql2/promise';
// const mysql = require('mysql2/promise');

const button = document.querySelector('#btn')
let title = ''
let text = ''

button.addEventListener('click', (e) => {
  e.preventDefault()
  title = document.querySelector('#fileName').value
  text = document.querySelector('#postform-text').value
  console.log(title)
  console.log(text)
  main()
})

async function main() {
  try {

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
      'INSERT INTO pastebin_data (Title, Text, EndDate, URL) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 MONTH), "zzz@fff.com")', [title, text]
    );


    await connection.end();
  } catch (err) {
    console.error('Error:', err);
  }
}



// main();