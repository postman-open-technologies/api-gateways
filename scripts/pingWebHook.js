const axios = require('axios').default;

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const pingWebHook = () => new Promise((resolve) => {
  const host = process.env.WEB_HOOK || null;
  if (host) {
    axios.get(process.env.WEB_HOOK)
    .then(() => {
      /* eslint-disable no-console */
      console.info('Success ping web hook');
      /* eslint-enable */
      resolve();
    })
    .catch(err => {
      console.log('There was an issue when pinging the `WEB_HOOK`')
      resolve();
    });
  } else {
    console.log('`WEB_HOOK` was not defined.. As a result the webhook was not pinged.')
    resolve();
  }
});

module.exports = pingWebHook;