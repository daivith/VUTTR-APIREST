const JWT = require('jsonwebtoken');
const { ALGORITHM } = require('./confs');

const { ERR_INVALID_TOKEN } = require('../utils/errorTypes');

const generate = (payload) => (
  new Promise((resolve) => {
    JWT.sign(payload, process.env.SECRET_KEY, { algorithm: ALGORITHM }, (err, token) => {
      if (err) {
        console.error(err);
        throw new Error(ERR_INVALID_TOKEN);
      }
      resolve(token);
    });
  })
);

module.exports = {
  generate,
};
