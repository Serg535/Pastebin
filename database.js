import mysql from 'mysql2';
import 'dotenv/config';

  const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
 
connection.connect((error) => {
  if (error) {
    console.log('Ошибка', error)
  }
  else {
    console.log('Подключено')
  }
})

export default connection;