require('dotenv-safe').config();
require('./services/mongo');
require('./services/redis.service').connect();

const { start } = require('./server');

const init = async () => {
  const server = await start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
