// Update with your config settings.
/* eslint-disable */

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/lambdaface.sqlite3',
    },
    useNullAsDefault: true
  },
  // development: {
  //   client: 'mysql',
  //   connection: {
  //     host: 'localhost',
  //     database: 'lambdaface',
  //     user: 'root',
  //     password: '12345678'
  //   }
  // },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
