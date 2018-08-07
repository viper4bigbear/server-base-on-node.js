const fs = require('fs')
const path = require('path')
const http = require('http')

let rootPath = path.join(__dirname, 'www')
// console.log(rootPath)
let server = http.createServer((request, response) => {
  let targetPath = path.join(rootPath, request.url)
  if (fs.existsSync(targetPath)) {
    fs.stat(targetPath, (err, stats) => {
      if (stats.isDirectory()) {
        fs.readdir(targetPath, (err, data) => {
          response.setHeader('content-type', 'text/html;charset=utf-8')
          response.end(`
          <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
          <html><head>
          <title>${request.url}</title>
          </head><body>
          <h1>文件目录</h1>
          <ul>
            
          </ul>
          </body></html>
          `)
        })
      } else if (stats.isFile()) {
        fs.readFile(targetPath, (err, data) => {
          response.end(data)
        })

      }
    })
  } else {
    response.statusCode = 404
    response.setHeader('content-type', 'text/html;charset=utf-8')
    response.end(`
      <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
      <html><head>
      <title>404 Not Found</title>
      </head><body>
      <h1>Not Found</h1>
      <p>你请求的${request.url} 不在服务器上哦,检查一下呗</p>
      </body></html>
    `)
  }
})
server.listen(80, '127.0.0.1', () => {
  console.log('service start')
})