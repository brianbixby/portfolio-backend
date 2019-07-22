'use strict';

require('dotenv').config();
const compression = require('compression');
const express = require('express');
const debug = require('debug')('portfoliobackend:server');
const mongoose = require('mongoose');

const allRoutes = require('./routes/allRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false });

app.use(compression());
app.use(allRoutes);

const server = module.exports = app.listen(PORT, () => {
  debug(`portfolio is running on: ${PORT}`);
});

server.isRunning = true;