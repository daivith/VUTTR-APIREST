const boom = require('@hapi/boom');
const authenticate = require('../auth/authenticate.auth');
const userRepository = require('../repositories/users.repository');

const {
  ERR_USER_NOT_FOUND,
  ERR_INVALID_PASSWORD,
  ERR_INVALID_TOKEN,
} = require('../utils/errorTypes');

const login = async (req, h) => {
  const { email, password } = req.payload;

  try {
    const { user, token } = await authenticate.login(email, password);

    await userRepository.setCache(user);

    return h.response({ token }).code(200);
  } catch (e) {
    switch (e.message) {
      case ERR_USER_NOT_FOUND:
        throw boom.notFound('User not found');
      case ERR_INVALID_PASSWORD:
        throw boom.badData('Invalid email or password');
      case ERR_INVALID_TOKEN:
        throw boom.badImplementation('Error generating token');
      default:
        throw boom.badImplementation(e);
    }
  }
};

module.exports = {
  login,
};
