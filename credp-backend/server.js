require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(express.static(path.resolve('./public')));

app.get('/', async (_req, res) => {
  res.send('hello world');
});

const Router = require('./routes');

app.use(Router);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
