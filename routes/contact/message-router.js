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
      user: process.env.EMAIL,
      pass: process.env.EMAILPASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: '*** Built By Bixby ***',
    html: `<p>Thanks for reaching out. I will be in contact with you soon!</p>
            <p>Best,</p>
            <p>Brian</p>
            <p>425.770.2609</p>`,
  };

  new Message(req.body).save()
    .then(() => {
      return transporter.sendMail(mailOptions)
        .catch(next);
    })
    .then(() => res.sendStatus(200))
    .catch(next);
});
