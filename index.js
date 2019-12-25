require('dotenv').config();

const config = require('./util/config');
const getBrowser = require('./util/browser');

const sendEmail = require('./tasks/send-email');
const getLoans = require('./tasks/get-loans');
const renewLoans = require('./tasks/renew-loans');
const signIn = require('./tasks/sign-in');
const getEmailTemplate = require('./tasks/get-email-template');

run();

async function run() {
  let loans, browser;

  try {
    console.log('Opening browser...');
    browser = await getBrowser();

    console.log('Opening new page...');
    const page = await browser.newPage();

    console.log('Signing in...');
    await signIn(page);

    console.log('Renewing loans...');
    await renewLoans(page);

    console.log('Getting pending loans...');
    loans = await getLoans(page);
  } catch (error) {
    console.error('Failed in the browser: ', error);
    return;
  } finally {
    console.log('Closing browser...');
    await browser.close();
  }
  const deadlineThreshold = new Date();
  deadlineThreshold.setDate(deadlineThreshold.getDate() + config.library.deadlineThresholdDays);

  const booksToReturnSoon = loans.filter(({ deadline }) => deadline < deadlineThreshold);

  if (!booksToReturnSoon.length) {
    console.log('No books to return soon; skipping email phase.');
    return;
  }

  try {
    console.log('Getting email template...');
    const emailTemplate = getEmailTemplate(booksToReturnSoon);

    console.log('Sending email...');
    await sendEmail({ text: emailTemplate, subject: config.email.subject });
  } catch (error) {
    console.error('Failed to send the email: ', error);
  }
}
