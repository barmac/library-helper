const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

handlebars.registerHelper('dateFormat', require('handlebars-dateformat'));


module.exports = function getEmailTemplate(books) {
  const rawTemplate = fs.readFileSync(path.join(__dirname, '../resources/email-template.mst'))
    .toString('utf8');

  const template = handlebars.compile(rawTemplate);

  return template({ books });
}