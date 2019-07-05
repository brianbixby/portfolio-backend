'use strict';

const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
  url: {type: String, required: true },
  name: {type: String, required: true },
  shortDesc: {type: String, required: true },
  fullDesc: {type: String },
  fullDesc1: {type: String },
  fullDesc2: {type: String },
  keyTech: {type: String },
  site: {type: String },
  github: {type: String },
  image: {type: String, required: true },
  bwImage: {type: String },
  bigImage: {type: String },
  projects: [{projectName: String, projectGithub: String, projectDesc: String }],
});

module.exports = mongoose.model('project', projectSchema);