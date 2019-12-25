const selectors = require('../resources/selectors.json');


/**
 * Renew loans.
 *
 * @param {import('puppeteer-core').Page} page
 */
module.exports = async function renewLoans(page) {
  await page.waitForSelector(selectors.ACCOUNT_VIEW);

  await Promise.all([
    page.waitForNavigation(),
    page.click(selectors.ACCOUNT_VIEW)
  ]);

  await page.waitForSelector(selectors.LOANED_BOOKS);
  await page.click(selectors.LOANED_BOOKS);

  await page.waitForSelector(selectors.RENEWAL_SELECT);
  await page.click(selectors.RENEWAL_SELECT);

  await page.waitForSelector(selectors.RENEW_BUTTON);
  await page.click(selectors.RENEW_BUTTON);
}
