const selectors = require('../resources/selectors.json');

const config = require('../util/config');


/**
 * Sign in to the library account.
 *
 * @param {import('puppeteer-core').Page} page
 */
module.exports = async function signIn(page) {
  await page.goto(config.library.homePage);

  await page.waitForSelector(selectors.LOGIN_PAGE_BUTTON);

  await Promise.all([
    page.waitForNavigation(),
    page.click(selectors.LOGIN_PAGE_BUTTON)
  ]);

  await page.waitForSelector(selectors.LOGIN_BUTTON)

  await page.type(selectors.CARD_NUMBER_INPUT, config.library.login);

  await page.type(selectors.PASSWORD_INPUT, config.library.password);

  await Promise.all([
    page.waitForNavigation(),
    page.click(selectors.LOGIN_BUTTON)
  ]);
}
