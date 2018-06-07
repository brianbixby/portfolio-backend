'use strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  url: {type: String, required: true },
  name: {type: String, required: true },
  shortDesc: {type: String, required: true },
  fullDesc: {type: String, required: true },
  site: {type: String, required: true },
  github: {type: String, required: true },
});

module.exports = mongoose.model('project', projectSchema);