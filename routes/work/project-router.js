'use strict';

const { Router, json } = require('express');
const debug = require('debug')('portfoliobackend:project-router');
const createError = require('http-errors');

const Project = require('../../model/work/project.js');

const projectRouter = module.exports = Router();

// http post :3000/api/project url="bracket-busters" name="Bracket Busters" shortDesc="A nba pick em app" fullDesc="full desc" site="www.bracketbusters.us" github="https://github.com/brianbixby/portfolio-frontend" image="http://via.placeholder.com/350x150"
projectRouter.post('/api/project', json(), (req, res, next) => {
  debug('POST: /api/project'); 

  new Project(req.body).save()
    .then( project => res.json(project))
    .catch(next);
});

// http get :3000/api/projects
projectRouter.get('/api/projects', (req, res, next) => {
  debug('GET: /api/projects'); 

  Project.find({})
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
    .then(project => {
      if(!project)
        return next(createError(404, 'NOT FOUND ERROR: projects not found'));
      res.json(project[0]);
    })
    .catch(next);
});