const ApiBuilder = require('claudia-api-builder')
const client = require('./db')
const api = new ApiBuilder()

module.exports = api

// const renderPage = (body) => {
//   return ```
//   <html>
//     <body>
//       <h1>Helo from Claudia.js</h1>
//       ${body}
//     </body>
//   </html>
//   ```
// }

api.get('/health_check', (req) => {
  return new api.ApiResponse('OK', { 'X-Version': '202', 'Content-Type': 'text/plain' })
})

api.get('/posts/{post_id}', (req) => {
  return req.pathParams.post_id
})

// api.get('{post_id}', (req) => {
//   const { post_id } = req.pathParams

//   if (req.queryString.type) {
//     return renderPage(`<h2>${post_id}</h2>`)
//   } else {
//     throw renderPage('<div style="color: red">Please provide a type</a>')
//   }
// },  { error: { code: 403, contentType: 'text/html' }, success: { 'Content-Type': 'text/html' }})
