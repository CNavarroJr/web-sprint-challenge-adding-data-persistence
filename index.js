const server = require('./server')

const PORT = process.env.PORT || 5000

server.use('/api/project/', require('./projects/projectsRouter'))
server.use('/api/resource/', require('/resources/resourcesRouter'))

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})