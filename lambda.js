const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()

module.exports = api

api.get('/hello', () => {
  return 'hello, world'
})
api.get('/echo', (req) => {
  return req
})
api.get('/greet', (req) => {
  return `${req.queryString.name} is hoge`
})
api.get('/people/{name}', (req) => {
  return `${req.pathParams.name} is hoge`
})
