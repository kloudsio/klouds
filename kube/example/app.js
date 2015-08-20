import http from 'http'

const port = process.env.PORT || 8080

let server = http.createServer((request, response) => {
  response.writeHead(200)
  response.end("Hello World!")
})

server.listen(port)
console.log(`server started on port ${port}`)
