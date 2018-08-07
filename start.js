const fs = require('fs')
const path = require('path')
const http = require('http')

let rootPath = path.join(__dirname, 'www')
// console.log(rootPath)
let server = http.createServer((request, response) => {
  response.end('hello world')
})
server.listen(80, '127.0.0.1', () => {
  console.log('service start')
})