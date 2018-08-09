const fs = require('fs')
const path = require('path')
const http = require('http')
const mime = require('mime')
let rootPath = path.join(__dirname, 'www')
// console.log(rootPath)
let server = http.createServer((request, response) => {
  let targetPath = path.join(rootPath, request.url)
  if (request.url == '/index.food') {
    fs.readFile('./data/food.json', (err, data) => {
      if (err) {
        respnse.end(err)
      } else {
        // console.log(data)
        let foodData = JSON.parse(data)
        // console.log(foodData)
        let tem = ''
        foodData.forEach(e => {
          tem += `<li>${e}</li>`
        });
        fs.readFile('./template/index.html', (err, data) => {
          if (err) {
            respnse.end(err)
          } else {
            tem = data.toString().replace('${tem}', tem)
            response.end(tem)
          }
        })

      }
    })
    return
  }
  if (fs.existsSync(targetPath)) {
    fs.stat(targetPath, (err, stats) => {
      if (stats.isDirectory()) {
        fs.readdir(targetPath, (err, files) => {
          var str = ''
          for (let i = 0; i < files.length; i++) {
            var url = path.join(request.url, files[i])
            str += `<li><a href="${url}">${files[i]}</a></li>`
          }
          response.setHeader('content-type', 'text/html;charset=utf-8')
          response.end(`
          <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
          <html><head>
          <title>Index of/</title>
          </head><body>
          <h1>Index of${request.url}</h1>
          <ul>
            <li><a href="javascript:history.back(-1)">..</a></li>
            ${str}
          </ul>
          </body></html>
          `)
        })
      } else if (stats.isFile()) {
        response.setHeader(
          'content-type',
          `${mime.getType(targetPath)};charset=utf-8`
        )
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
  console.log('server start')
})