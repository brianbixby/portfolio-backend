'use strict';

const { Router } = require('express');
const debug = require('debug')('portfoliobackend:project-router');
const createError = require('http-errors');

const Project = require('../../model/work/project.js');

const projectRouter = module.exports = Router();

// http get :3000/api/projects
projectRouter.get('/api/projects', (req, res, next) => {
  debug('GET: /api/projects'); 

  Project.find()
    .then(projects => {
      if(!projects)
        return next(createError(404, 'NOT FOUND ERROR: projects not found'));
      res.json(projects);
    })
    .catch(next);
});

// http get :3000/api/project/:url
projectRouter.get('/api/project/:url', (req, res, next) => {
  debug('GET: /api/project/:url'); 

  Project.find({ url: req.params.url })
    .then(projects => {
      if(!projects)
        return next(createError(404, 'NOT FOUND ERROR: projects not found'));
      res.json(projects);
    })
    .catch(next);
});