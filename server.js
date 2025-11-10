import http from 'http';
import connection from './database.js';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'src', 'index.html')
        fs.readFile(filePath, (error, data) => {
            if (error) {
                console.log('ошибка при чтении', error)
                res.writeHead(404)
                res.end('Ошибка при чтении')
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/html'})
                res.end(data)
            }
        })
        return
    }

    if (req.url === '/style.css') {
        const filePath = path.join(__dirname, 'src', 'styles', 'style.css')
        fs.readFile(filePath, (error, data) => {
            if (error) {
                console.log('ошибка при чтении', error)
                res.writeHead(404)
                res.end('Ошибка при чтении')
            }
            else {
                res.writeHead(200, { 'Content-Type': 'text/css'})
                res.end(data)
            }
        })
        return
    }

    if (req.url === '/script.js') {
        const filePath = path.join(__dirname, 'src', 'script.js')
        fs.readFile(filePath, (error, data) => {
            if (error) {
                console.log('ошибка при чтении', error)
                res.writeHead(404)
                res.end('Ошибка при чтении')
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/js'})
                res.end(data)
            }
        })
        return
    }

    if (req.url === '/create-text' && req.method === 'POST') {
        let body = ''

        req.on('data', chunk => {
            body += chunk.toString()
        })

        req.on('end', ()=> {
            try {
                const {title, text} = JSON.parse(body)
                const randomURL = Math.random().toString(36).substring(2, 8)

                const sql_order = `
                INSERT INTO pastebin_data (title, text, EndDate, url) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 MONTH), ?);
                `
                connection.query(sql_order, [title, text, randomURL], (error, results) => {
                    if (error) {
                        console.error('Ошибка при запросе sql', error)
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        res.end(JSON.stringify({error: 'Ошибка БД'}))
                    }
                    else {
                        console.log('success')
                        res.writeHead(200, { 'Content-Type': 'application/json'})
                        res.end(JSON.stringify({
                            success: true,
                            id: results.insertId,
                            url: randomURL,
                            message: 'Текст отправлен'
                        }))
                    }
                })

            }
            catch (error) {
                console.error('Ошибка при парсинге', error)
                res.writeHead(400, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({
                    error: 'Неверный JSON'
                }))
            }
        })
        return
    }

})

const PORT = 3000
server.listen(PORT, ()=> {
    console.log(`сервер запущен на http://localhost:${PORT}`)
})