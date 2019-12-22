const config = require('./util/config');
const getBrowser = require('./util/browser');

const sendEmail = require('./tasks/send-email');
const getLoans = require('./tasks/get-loans');
const renewLoans = require('./tasks/renew-loans');
const signIn = require('./tasks/sign-in');
const getEmailTemplate = require('./tasks/get-email-template');

module.exports = async function run() {
  const browser = await getBrowser();

  const page = await browser.newPage();

  let loans;

  try {
    await signIn(page);
    await renewLoans(page);

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
