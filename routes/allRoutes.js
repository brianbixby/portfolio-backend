'use strict';

const Router = require('express').Router;

const messageRouter = require('./contact/message-router.js');
const projectRouter = require('./work/project-router.js');
const errors = require('./../lib/error-middleware.js');

module.exports = new Router()
  .use([
    messageRouter,
    projectRouter,
    errors,
  ]);

  