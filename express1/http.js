const http = require('http')

const app = http.createServer((req, res) => {
  console.log('req=>', req)
  if (req.url === '/') {
    res.end('Hello World')
  } else if (req.url === '/about') {
    res.end('about')
  } else {
    res.end('404')
  }
})
app.listen(3000, () => {
  console.log('app listen 3000')
})