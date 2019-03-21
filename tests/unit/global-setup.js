const app = require('express')()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  next()
})

module.exports = () => {
  return new Promise((resolve, reject) => {
    global.mockApiServer = app.listen(process.env.MOCK_API_PORT, resolve)
  })
}
