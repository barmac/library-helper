const puppeteer = require('puppeteer');

module.exports = async function getBrowser() {
  return puppeteer.launch({ args: ['--no-sandbox'] });
}
