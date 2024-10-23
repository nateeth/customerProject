const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cardRouter = require('./routes/cardRouter');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/cards', cardRouter)

module.exports = app;