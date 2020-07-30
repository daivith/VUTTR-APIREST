require('dotenv-safe').config();
const hapi = require('@hapi/hapi');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const routes = require('./routes');
const jwtStrategy = require('./auth/strategies/JWT');

const { PORT } = process.env;
const { HOST } = process.env;

const server = new hapi.server({
  port: PORT,
  host: HOST,
});

server.route(routes);

const initializePlugins = async () => {
  await server.register(hapiAuthJwt2);
  await server.auth.strategy(jwtStrategy.name, jwtStrategy.schema, jwtStrategy.options);
  server.auth.default(jwtStrategy.name);
};

const start = async () => {
  await initializePlugins();
  await server.start();

  return server;
};

const init = async () => {
  await initializePlugins();
  await server.initialize();

  return server;
};

module.exports = {
  start,
  init,
};
