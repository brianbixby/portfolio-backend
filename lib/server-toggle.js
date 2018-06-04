'use strict';

const debug = require('debug')('portfoliobackend:server-toggle');
const mongoose = require('mongoose');

module.exports = exports = {};

exports.serverOn = (server, done) => {
  if (!server.isRunning) {
    server.listen(process.env.PORT, () => {
      server.isRunning = true;
      debug('server is running');
      done();
    });
    return;
  }
  done();
};

exports.serverOff = (server, done) => {
  if (server.isRunning) {
    server.close( err => {
      if (err) return done(err);
      server.isRunning = false;
      mongoose.connection.close();
      debug('server is down');
      done();
    });
    return;
  }
  done();
};