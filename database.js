import mysql from 'mysql2';

  const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'vboxuser',
      database: 'pastebin_db'
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