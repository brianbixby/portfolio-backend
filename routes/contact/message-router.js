'use strict';

const { Router, json } = require('express');
const nodemailer = require('nodemailer');
const debug = require('debug')('portfoliobackend:message-router');
const createError = require('http-errors');

const Message = require('../../model/contact/message.js');

const messageRouter = module.exports = Router();

// http POST :3000/api/message name='jon smith' email='example@example.com' message='example message'
messageRouter.post('/api/message', json(), (req, res, next) => {
  debug('POST: /api/message'); 
  const { name, email, message } = req.body;
  const errorMessage = !name ? 'expected a name'
    : !email ? 'expected an email'
      : !message ? 'expected a message'
        : null;

  if(errorMessage)
    return next(createError(400, `BAD REQUEST ERROR: ${message}`));

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'portfoliobrianbixby@gmail.com',
      pass: 'Thailand2017',
    },
  });
  const text = `name: ${name} \n\n email: ${email} \n\n message: ${message}`; 
  const mailOptions = {
    from: 'portfoliobrianbixby@gmail.com',
    to: 'brianbixby0@gmail.com',
    subject: '*** Portfolio Contact ***',
    text: text,
  };

  new Message(req.body).save()
    .then(() => transporter.sendMail(mailOptions))
    .then(() => res.sendStatus(200))
    .catch(next);
});