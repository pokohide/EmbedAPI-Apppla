const ApiBuilder = require('claudia-api-builder')
const ejs = require('ejs')
// const client = require('./db')
const api = new ApiBuilder()

module.exports = api

const renderPage = (rows) => {
  const post = rows[0]
  const tags = rows.map(row => row.tag_name)
  // console.log(post, tags)
  return ejs.renderFile('./pages/summary.ejs', { post: post, tags: tags })
  // ejs.renderFile('./pages/summary.ejs', { post: post, tags: tags }, (err, str) => {
  //   console.log(err)
  //   return str
  // })
}

const renderError = (e) => {
  return ejs.renderFile('./pages/error.ejs')
}

const { Client } = require('pg')
const { PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT, PG_HOST } = require('./config')
const client = new Client({
  user: PG_USER,
  password: PG_PASSWORD,
  database: PG_DATABASE,
  port: PG_PORT,
  host: PG_HOST,
  ssl: true
})
client.connect()

api.get('/health_check', (req) => {
  return new api.ApiResponse('OK', { 'X-Version': '202', 'Content-Type': 'text/plain' })
})

api.get('/posts/{post_id}', (req) => {
  const post_id = req.pathParams.post_id

  return new Promise((resolve, reject) => {

    query = `
      SELECT
        posts.id,
        posts.name, posts.short_description, posts.comments_count, posts.likes_count, posts.link, posts.image, posts.description, posts.slug,
        categories.name AS category_name, categories.name_en AS categories_name_en,
        tags.name AS tag_name
      FROM POSTS
      INNER JOIN Categories ON (categories.id = posts.category_id)
      INNER JOIN Taggings ON (taggings.taggable_id = posts.id AND taggings.context = 'tags' AND taggings.taggable_type = 'Post')
      INNER JOIN Tags ON (tags.id = taggings.tag_id)
      WHERE (posts.slug = '${post_id}')
    `

    client.query(query)
      .then(result => resolve(result.rows))
      .catch(e => reject(e))
      .then(() => client.end())

  })
  .then(rows => {
    return renderPage(rows)
  })
  .catch(e => {
    throw renderError(e)
  })
}, {
  success: { contentType: 'text/html' },
  error: { code: 403, contentType: 'text/html' }
})
