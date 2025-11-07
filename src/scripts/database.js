import mysql from 'mysql2';

  const connection = mysql.createConnection({
      host: 'localhost',
      user: 'app_user',
      password: '',
      database: 'pastebin'
    });
 
connection.connect((error) => {
  if (error) {
    console.log('Ошибка', error)
  }
  else {
    console.log('Подключено')
  }
})

export default connection