const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cardRouter = require('./routes/cardRouter');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', cardRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
