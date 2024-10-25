require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server has started on port', 3000);
});

console.log('DB_URL:', process.env.DB_URL);
console.log('DB_URL_PROD:', process.env.DB_URL_PROD);
console.log('NODE_ENV:', process.env.NODE_ENV);
