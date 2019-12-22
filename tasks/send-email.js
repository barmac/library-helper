const nodemailer = require('nodemailer');

const { email: config } = require('../util/config');

module.exports = function({ subject, text }) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: true,
    auth: {
      user: config.username,
      pass: config.password
    }
  }).sendMail({
    from: config.from,
    to: config.to,
    subject,
    text
  });
}