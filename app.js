const express = require('express');
const app = express();
//const morgan = require('morgan');
const routes = require('./routes');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const thoughtRoutes = require('./routes/api/thoughts');
const userRoutes = require('./routes/api/users');
const db = require('./config/connection');
// const { db } = require('./models/thought');
// const { db } = require('./models/user');

mongoose.connect('mongodb://localhost:3003/' , { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

// Routes which should handle requests
// app.use('/api/thoughts', thoughtRoutes);
// app.use('/api/users', userRoutes);

// Handle errors
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

db.once('open', () => {
    app.listen(3003, () => {
        console.log('API server running on port 3003!');
    });
});

module.exports = app;