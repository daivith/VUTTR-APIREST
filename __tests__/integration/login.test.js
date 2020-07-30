const { connectMongoTest, disconnectMongoTest, removeAllCollections } = require('../utils/mongo');
const { init } = require('../../src/server');

jest.mock('../../src/services/redis.service');

const cacheRep = require('../../src/repositories/cache.repository')
const factory = require('../factories');

jest.spyOn(cacheRep, 'del').mockImplementation(() => true)

describe('integration login', () => {
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

  it('should be able to register an user generating token', async () => {
    const userData = await factory.attrs('User');
    jest.spyOn(cacheRep, 'set').mockImplementation(() => { })
    const req = await server.inject({
      method: 'post',
      url: '/api/v1/users',
      payload: userData
    });
    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'post', url: '/api/v1/login', payload: {
        email: userData.email,
        password: userData.password
      }
    });
    expect(response.statusCode).toBe(200);
    expect(response.result).toMatchObject({
      token: response.result.token,
    });
  });

  it('should not be able to log in when user does not exists', async () => {
    const userData = await factory.attrs('User');
    const response = await server.inject({
      method: 'post', url: '/api/v1/login', payload: {
        email: userData.email,
        password: userData.password
      }
    });
    expect(response.statusCode).toBe(404);
    expect(response.result).toMatchObject({
      message: 'User not found',
    });
  });

  it('should not be able to log in when password is wrong', async () => {
    const userData = await factory.attrs('User');

    const req = await server.inject({ method: 'post', url: '/api/v1/users', payload: userData });

    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'post', url: '/api/v1/login', payload: {
        email: userData.email,
        password: `wrong${userData.password}`
      }
    });

    expect(response.statusCode).toBe(422);
    expect(response.result).toMatchObject({
      message: 'Invalid email or password',
    });
  });

  it('should not be able to request if token does not provided', async () => {
    const req = await server.inject({
      method: 'post',
      url: '/api/v1/logout',
    });

    expect(req.statusCode).toBe(401);
    expect(req.result).toMatchObject({
      error: 'Unauthorized',
      message: 'Missing authentication',
    });
  });

  it('must be able to access a route by authenticating with token', async () => {
    const userData = await factory.attrs('User');
    jest.spyOn(cacheRep, 'exists').mockImplementation(() => false)

    const req = await server.inject({
      method: 'post',
      url: '/api/v1/users',
      payload: userData
    });
    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'post', url: '/api/v1/login', payload: {
        email: userData.email,
        password: userData.password
      }
    });
    expect(response.statusCode).toBe(200);
    expect(response.result).toMatchObject({
      token: response.result.token,
    });

    const token = response.result.token;

    const response1 = await server.inject({
      method: 'get', url: '/api/v1/users',
      headers: { authorization: "Bearer " + token }
    });
    expect(response1.statusCode).toBe(200);
  });

  it('must be logout', async () => {
    const userData = await factory.attrs('User');

    const req = await server.inject({
      method: 'post',
      url: '/api/v1/users',
      payload: userData
    });
    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'post', url: '/api/v1/login', payload: {
        email: userData.email,
        password: userData.password
      }
    });
    expect(response.statusCode).toBe(200);
    expect(response.result).toMatchObject({
      token: response.result.token,
    });

    const token = response.result.token;
    const response2 = await server.inject({
      method: 'post', url: '/api/v1/logout',
      headers: { authorization: "Bearer " + token }
    });
    expect(response2.statusCode).toBe(200);
  });

});
