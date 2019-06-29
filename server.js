'use strict';

require('dotenv').config();
const express = require('express');
const debug = require('debug')('portfoliobackend:server');
const mongoose = require('mongoose');

const allRoutes = require('./routes/allRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.use(allRoutes);

const server = module.exports = app.listen(PORT, () => {
  debug(`portfolio is running on: ${PORT}`);
});

server.isRunning = true;