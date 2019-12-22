const chromium = require('chrome-aws-lambda');

module.exports = async function getBrowser() {
  return chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });
}
