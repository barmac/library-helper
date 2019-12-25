const puppeteer = require('puppeteer');

module.exports = async function getBrowser() {
  return puppeteer.launch({
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process',
      '--proxy-server=\'direct://\'',
      '--proxy-bypass-list=*',
      '--deterministic-fetch',
    ]
  });
}
