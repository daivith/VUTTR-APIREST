const { connectMongoTest, disconnectMongoTest, removeAllCollections } = require('../utils/mongo');
const { init } = require('../../src/server');
jest.mock('../../src/services/redis.service');

const factory = require('../factories');

const auth = {
  strategy: 'jwt',
  credentials: 'Bearer abc',
};

describe('integration routes use', () => {
  beforeAll(async () => {
    server = await init();
    await connectMongoTest();
  });

  afterEach(async () => {
    await removeAllCollections();
  });

  afterAll(async () => {
    await disconnectMongoTest();
  });

  it('should return array users', async () => {
    const res = await server.inject({
      method: 'get',
      url: '/api/v1/users',
      auth
    });
    expect(res.payload).toBe('[]');
  });

  it('should be able to register an user', async () => {
    const userData = await factory.attrs('User');
    const res = await server.inject({
      method: 'post',
      url: '/api/v1/users',
      payload: userData
    });
    expect(res.statusCode).toBe(201);
    expect(res.result).toMatchObject({
      name: res.result.name,
      email: res.result.email
    });

  });

  it('should not be able to register with duplicated email', async () => {
    const userData = await factory.attrs('User');
    const create = await server.inject({ method: 'post', url: '/api/v1/users', payload: userData });
    expect(create.statusCode).toBe(201);

    const response = await server.inject({ method: 'post', url: '/api/v1/users', payload: userData });

    expect(response.statusCode).toBe(422);
    expect(response.result).toMatchObject({
      message: 'User already exists',
    });
  });
});
