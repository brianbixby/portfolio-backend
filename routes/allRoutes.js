'use strict';

const Router = require('express').Router;
const cors = require('cors');

const messageRouter = require('./contact/message-router.js');
const projectRouter = require('./work/project-router.js');
const errors = require('./../lib/error-middleware.js');

const whiteList = [process.env.CORS_ORIGINS, process.env.CORS_ORIGINS1, process.env.CORS_ORIGINS2, process.env.CORS_ORIGINS3, process.env.CORS_ORIGINS4];

module.exports = new Router()
  .use([
    cors({
      credentials: true,
      origin: (origin, cb) => {
        if (whiteList.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          cb(new Error('Not allowed by CORS'));
        }
      },
    }),
    messageRouter,
    projectRouter,
    errors,
  ]);