'use strict';

const mongoose = require('mongoose');

module.exports = exports = {};

exports.serverOn = (server, done) => {
  if (!server.isRunning) {
    server.listen(process.env.PORT, () => {
      server.isRunning = true;
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
      done();
    });
    return;
  }
  done();
};