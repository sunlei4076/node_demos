const fs = require('fs')

fs.readFile('yarn.lock', {encoding: 'utf-8'}, (error, data) => {
  if (error) {
    console.error(error)
  }
  console.log(data)
})
console.log('fs')