require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log('Server has started on port', PORT);
// }); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/cards', (req, res) => {
  res.send('Hello cards!');
}); 

app.get('/users', (req, res) => {
  const { name, age } = req.query;
  res.send(`Hello users ${name} ${age}!`);
}) 

app.listen(3000, () => {
  console.log('Server has started on port', 3000);
});

// module.exports = app;


