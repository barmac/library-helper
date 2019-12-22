const config = require('./util/config');
const getBrowser = require('./util/browser');

const sendEmail = require('./tasks/send-email');
const getLoans = require('./tasks/get-loans');
const renewLoans = require('./tasks/renew-loans');
const signIn = require('./tasks/sign-in');
const getEmailTemplate = require('./tasks/get-email-template');

run();

async function run() {
  const browser = await getBrowser();

  let page = await browser.newPage(),
      loans;

  try {
    await signIn(page);
    await renewLoans(page);
    await page.close();

    page = await browser.newPage();
    await signIn(page);
    loans = await getLoans(page);
  } finally {
    await browser.close();
  }
  const deadlineThreshold = new Date();
  deadlineThreshold.setDate(deadlineThreshold.getDate() + config.library.deadlineThresholdDays);

  const booksToReturnSoon = loans.filter(({ deadline }) => deadline < deadlineThreshold);

  const emailTemplate = getEmailTemplate(booksToReturnSoon);

  await sendEmail({ text: emailTemplate, subject: config.email.subject });
}
