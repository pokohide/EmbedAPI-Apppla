const { Client } = require('pg')
const { DATABASE_URL } = require('./config')

// const client = new Client({ connectionString: DATABASE_URL })
const client = new Client(DATABASE_URL)
client.connect()

module.exports = client
