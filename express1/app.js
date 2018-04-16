const express = require('express')
const path = require('path')
const logger = require('morgan')
const http = require('http')
const app = express()
const publicPath = path.resolve(__dirname, '../express1')
app.use(logger('short'))
app.use(express.static(publicPath))
app.get('/', (req, res) => {
  res.end('welcome to my page')
})
app.get('/about', (req, res) => {
  res.end('weclome to about page')
})
app.get('/weather', (req, res) => {
  res.end('welcome weather')
})
app.use((req, res) => {
  res.statusCode = 404
  res.end('404')  
})
http.createServer(app).listen(3000, () => {
  console.log('express!!!')
})