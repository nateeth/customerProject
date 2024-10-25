require('dotenv').config();

module.exports = {
  development: {
    use_env_variable: 'DB_URL',  // указываем название переменной окружения
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
    use_env_variable: 'DB_URL_PROD', // указываем название переменной окружения
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    dialect: 'postgres',
  },
};
