const userHandler = require('../handlers/users.handler');
const userSchema = require('../schemas/users.schema');

module.exports = [
  {
    method: 'POST',
    path: '/api/v1/users',
    handler: userHandler.create,
    options: {
      validate: {
        payload: userSchema,
      },
      auth: false,
    },
  },
  { // teste pra rota
    method: 'GET',
    path: '/api/v1/users',
    handler: userHandler.getAll,
  },
];
