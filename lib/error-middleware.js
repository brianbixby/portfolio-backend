'use strict';

const createError = require('http-errors');
const debug = require('debug')('portfoliobackend:error-middleware');

module.exports = (err, req, res, next) => {
  debug('error-middleware');

  console.log('message:', err.message);
  console.log('name:', err.name);

  if (err.status) {
    res.status(err.status).send(err.name);
    next();
    return;
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};