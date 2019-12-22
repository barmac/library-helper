module.exports = {
  library: {
    homePage: process.env.LIBRARY_HOME_PAGE,
    login: process.env.LIBRARY_LOGIN,
    password: process.env.LIBRARY_PASSWORD,
    deadlineThresholdDays: Number.parseInt(process.env.DEADLINE_THRESHOLD_DAYS)
  },
  email: {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    host: process.env.EMAIL_HOST,
    port: Number.parseInt(process.env.EMAIL_PORT),
    subject: process.env.EMAIL_SUBJECT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD
  }
};
