const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cardRouter = require('./routes/cardRouter');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const groupRouter = require('./routes/groupRouter');
const app = express();
const path = require('path');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', cardRouter);
app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/groups', groupRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(express.static(path.join(__dirname, '..', 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

module.exports = app;
