import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vboxuser'
});

connection.connect((error) => {
  if (error) {
    console.log('Ошибка подключения:', error.message);
    return;
  }

  console.log('Подключаемся к MySQL...');

  // Создаем базу данных
  connection.query('CREATE DATABASE IF NOT EXISTS pastebin_db', (error) => {
    if (error) {
      console.log('Ошибка создания базы:', error);
      return;
    }
    console.log('База данных создана');

    // Используем нашу базу
    connection.query('USE pastebin_db', (error) => {
      if (error) {
        console.log('Ошибка выбора базы:', error);
        return;
      }

      // Создаем таблицу с 6 полями
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS pastebin_data (
          id INT AUTO_INCREMENT PRIMARY KEY,
          StartDate DATETIME DEFAULT CURRENT_TIMESTAMP,
          title VARCHAR(255) NOT NULL,
          text TEXT NOT NULL,
          EndDate DATETIME,
          url VARCHAR(10) UNIQUE
        )
      `;

      connection.query(createTableSQL, (error) => {
        if (error) {
          console.log('Ошибка создания таблицы:', error);
        } else {
          console.log('Таблица pastebin_data создана');
        }
        
        connection.end();
      });
    });
  });
});