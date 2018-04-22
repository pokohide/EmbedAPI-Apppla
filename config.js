require('dotenv').config({ silent: true })

const NAME = 'Apppla-embed-api'
const ENV = process.env.NODE_ENV || 'development'
const DEV = ENV === 'development'

module.exports = {
  NAME: NAME,
  ENV : ENV,
  DEV : DEV,
  SHOW_ERRORS: process.env.SHOW_ERRORS || DEV,
  PRETTY_PRINT: process.env.PRETTY_PRINT || DEV,
  HTTP_HOST: process.env.HTTP_HOST || '0.0.0.0',
  HTTP_PORT: process.env.HTTP_PORT || 8080,
  DEBUG_SQL: process.env.DEBUG_SQL,
  DATABASE_URL: process.env.DATABASE_URL,

  PG_USER: process.env.PG_USER,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_DATABASE: process.env.PG_DATABASE,
  PG_PORT: process.env.PG_PORT,
  PG_HOST: process.env.PG_HOST
}
