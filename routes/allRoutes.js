'use strict';

const Router = require('express').Router;
const morgan = require('morgan');
const cors = require('cors');

const messageRouter = require('./contact/message-router.js');
const projectRouter = require('./work/project-router.js');
const errors = require('./../lib/error-middleware.js');

module.exports = new Router()
  .use([
    cors({
      credentials: true,
      origin: process.env.CORS_ORIGINS,
    }),
    morgan('dev'),
    messageRouter,
    projectRouter,
    errors,
  ]);