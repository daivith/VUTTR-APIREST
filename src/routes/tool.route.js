const toolHandler = require('../handlers/tool.handler');
const toolSchema = require('../schemas/tool.schema');

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/tools',
    handler: toolHandler.getAll,
  },
  {
    method: 'GET',
    path: '/api/v1/tools/{id}',
    handler: toolHandler.find,
  },
  {
    method: 'POST',
    path: '/api/v1/tools',
    handler: toolHandler.save,
    options: {
      validate: {
        payload: toolSchema,
      },
    },
  },
  {
    method: 'DELETE',
    path: '/api/v1/tools/{id}',
    handler: toolHandler.remove,
  },
];
