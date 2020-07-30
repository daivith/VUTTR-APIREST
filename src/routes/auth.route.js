const loginHandler = require('../handlers/login.handler');
const logoutHandler = require('../handlers/logout.handler');
const loginSchema = require('../schemas/login.schema');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/login',
    handler: loginHandler.login,
    options: {
      auth: false,
      validate: {
        payload: loginSchema,
      },
    },
  },
  {
    method: 'POST',
    path: '/api/v1/logout',
    handler: logoutHandler.logout,
  },
];
