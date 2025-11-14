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
        const {title, text, randomURL} = req.body;
        const sql_order = `
        INSERT INTO pastebin_data (title, text, EndDate, url) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 MONTH), ?);
        `
        const [result] = await connection.promise().query(sql_order, [title, text, randomURL])
        console.log('Текст сохранен')
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

app.get('/show/:url', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'show.html'))
})

app.get('/api/paste/:url', async (req, res) => {
    try {
    const {url} = req.params
    const sql_get_url = `
    SELECT * FROM pastebin_data WHERE url = ?;
    `
    const [results] = await connection.promise().query(sql_get_url, [url])

    if (results.length === 0) {
        return res.status(404).json({error: 'Адрес не найден'})
    }

    res.json({paste: results[0]})
    }
    catch (error) {
        console.error('Ошибка в бд', error)
        res.status(404).json({error: 'Текст не был найден в бд'})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})