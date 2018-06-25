// Update with your config settings.
/* eslint-disable */
var dotenv = require('dotenv');
dotenv.load();

module.exports = {

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './database/lambdaface.sqlite3',
  //   },
  //   useNullAsDefault: true
  // },
  development: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    }
  },
  // todo:
  //  clean up file
  //  set up development

  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
