const selectors = require('../resources/selectors.json');


/**
 * Get list of borrowed books as { title, deadline }.
 *
 * @param {import('puppeteer-core').Page} page
 */
module.exports = async function getLoans(page) {
  await page.waitForSelector(selectors.LOANED_BOOKS);

  await Promise.all([
    page.waitForNavigation(),
    page.click(selectors.LOANED_BOOKS)
  ]);

  await page.waitForSelector(selectors.LOANS);
  const loanElements = await page.$$(selectors.LOANS);

  const loans = [];

  for (let loan of loanElements) {
    const titleElement = await loan.$(selectors.BOOK_TITLE);
    const title = await getText(titleElement, page);

    const deadlineElement =  await loan.$(selectors.DEADLINE);
    const deadline = await getText(deadlineElement, page);

    const [ day, month, year ] = deadline.split(/\/0?/);

    loans.push({
      title,
      deadline: new Date(year, month - 1, day)
    });
  }

  return loans;
};

function getText(element, page) {
  return page.evaluate(el => el.text, element);
}