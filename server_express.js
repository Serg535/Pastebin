import connection from './database.js';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('src'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'))
})

app.post('/api/create-text', async (req, res) => {
    try {
        const {title, text} = req.body;
        const randomURL = Math.random().toString(36).substring(2, 8)
        const sql_order = `
        INSERT INTO pastebin_data (title, text, EndDate, url) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 MONTH), ?);
        `
        const [result] = await connection.promise().query(sql_order, [title, text, randomURL])
        console.log('Паста сохранена')
        res.json({
            success: true,
            id: result.insertId,
            url: randomURL,
            message: 'текст создан'
        })
    }
    catch (error) {
        console.error('Ошибка создания текста', error)
        res.status(500).json({error: 'Ошибка БД'})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})