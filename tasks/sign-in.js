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

  await page.click(selectors.LOGIN_PAGE_BUTTON);

  await page.waitForSelector(selectors.LOGIN_BUTTON)

  await page.waitForSelector(selectors.CARD_NUMBER_INPUT);
  await page.focus(selectors.CARD_NUMBER_INPUT);
  await page.keyboard.type(config.library.login);

  await page.waitForSelector(selectors.PASSWORD_INPUT);
  await page.focus(selectors.PASSWORD_INPUT);
  await page.keyboard.type(config.library.password);

  await page.click(selectors.LOGIN_BUTTON);
}
