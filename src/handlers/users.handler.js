const boom = require('@hapi/boom');
const hash = require('../utils/hash');

const userRepository = require('../repositories/users.repository');
const { ERR_DUPLICATED_EMAIL } = require('../utils/errorTypes');

const transformer = (user) => ({
  name: user.name,
  email: user.email,
});

const create = async (req, h) => {
  try {
    const userData = req.payload;

    const passwordHash = await hash.make(userData.password, 10);

    userData.password = passwordHash;

    const user = await userRepository.create(userData);
    return h.response(transformer(user)).code(201);
  } catch (e) {
    switch (e.message) {
      case ERR_DUPLICATED_EMAIL:
        throw boom.badData('User already exists');
      default:
        throw boom.badImplementation(e);
    }
  }
};

const getAll = async (req, h) => {
  const user = await userRepository.getAll();
  return h.response(user.map(transformer));
};

module.exports = {
  create,
  getAll,
};
