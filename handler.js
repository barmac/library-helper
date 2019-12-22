'use strict';

const run = require('.');

module.exports.execute = async event => {
  await run();

  return { message: 'Library Helper executed successfully', event };
};
