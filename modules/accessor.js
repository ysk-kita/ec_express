var client_mysql = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'node_app'
  },
  pool: {
    min: 0,
    max: 7
  }
});

module.exports = client_mysql