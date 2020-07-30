const userRoutes = require('./users.route');
const authRoutes = require('./auth.route');
const toolRoutes = require('./tool.route');

module.exports = [
  ...userRoutes,
  ...toolRoutes,
  ...authRoutes,
];
