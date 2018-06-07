'use strict';

const request = require('superagent');
const Message = require('../model/contact/message.js');
const serverToggle = require('../lib/server-toggle.js');
const server = require('../server.js');

const url = 'http://localhost:3000';
const exampleMessage = {name: 'exampleName', email: 'exampleEmail', message: 'exampleMessage'};

describe('Message routes', function() {
  beforeAll(done => serverToggle.serverOn(server, done));
  afterAll(done => serverToggle.serverOff(server, done));
  afterEach( done => {
    Message.remove({})
      .then(() => done())
      .catch(done);
  });
  describe('POST: /api/message', () => {
    it('valid post body should return 200 status', done => {
      request.post(`${url}/api/message`)
        .send(exampleMessage)
        .end((err, res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          done();
        });
    });
    it('incomplete post body (no message) should return a 400 status', done => {
      request.post(`${url}/api/message`)
        .send({name: 'exampleName', email: 'exampleEmail'})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('incomplete post body (no email) should return a 400 status', done => {
      request.post(`${url}/api/message`)
        .send({name: 'exampleName', message: 'exampleMessage'})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('incomplete post body (no name) should return a 400 status', done => {
      request.post(`${url}/api/message`)
        .send({message: 'exampleMessage', email: 'exampleEmail'})
        .end((err, res) => {
          expect(res.status).toEqual(400);
          done();
        });
    });
    it('404 route not found', done => {
      request.post(`${url}/api/mess`)
        .send(exampleMessage)
        .end((err, res) => {
          expect(res.status).toEqual(404);
          done();
        });
    });
  });
});