require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: process.env.DB_URL
      ? 'DB_URL'
      : 'postgresql://postgres.esgcsmhvcqvevmxeyfcu:FO2gD5v9YZ1JIy3Y@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
    dialect: 'postgres',
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: process.env.DB_URL_PROD
      ? 'DB_URL_PROD'
      : 'postgresql://postgres.esgcsmhvcqvevmxeyfcu:FO2gD5v9YZ1JIy3Y@aws-0-eu-central-1.pooler.supabase.com:5432/postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    dialect: 'postgres',
  },
};
