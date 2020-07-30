const { connectMongoTest, disconnectMongoTest, removeAllCollections } = require('../utils/mongo');
const { init } = require('../../src/server');
jest.mock('../../src/services/redis.service');
const factory = require('../factories');
const auth = {
  strategy: 'jwt',
  credentials: 'Bearer abc'
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
    await server.stop();
  });

  it('should be able to register a new tool', async () => {
    const toolData = await factory.attrs('Tool');
    const req = await server.inject({
      method: 'post',
      url: '/api/v1/tools',
      payload: toolData,
      auth,
    });

    expect(req.statusCode).toBe(201);
    expect(req.result.attributes).toMatchObject({
      title: req.result.attributes.title,
      link: req.result.attributes.link,
      description: req.result.attributes.description,
      tags: req.result.attributes.tags,
    });
  });

  it('should be able to list all tools', async () => {
    const toolData = await factory.attrs('Tool');
    const req = await server.inject({
      method: 'post', url: '/api/v1/tools', payload: toolData, auth
    });
    expect(req.statusCode).toBe(201);

    const req1 = await server.inject({
      method: 'post', url: '/api/v1/tools', payload: toolData, auth
    });
    expect(req1.statusCode).toBe(201);

    const response = await server.inject({
      method: 'get', url: '/api/v1/tools', auth
    });

    expect(response.statusCode).toBe(200);
    expect(response.result.data).toMatchObject(
      response.result.data.map(object => object)
    );
  });

  it('should not be able to list any data if it does not exists', async () => {
    const response = await server.inject({
      method: 'get', url: '/api/v1/tools', auth
    });

    expect(response.statusCode).toBe(404);
    expect(response.result).toMatchObject({
      message: 'No data was found',
    });
  });

  it('should be able to search tools by tag', async () => {
    const toolData = await factory.attrs('Tool');
    const req = await server.inject({
      method: 'post', url: '/api/v1/tools', payload: toolData, auth
    });
    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'get', url: `/api/v1/tools?tag=${req.result.attributes.tags[0]}`, auth
    });

    expect(response.statusCode).toBe(200);
    expect(response.result.data).toMatchObject(
      response.result.data.map(object => object)
    );
  });

  it('should be able to find a tool by id', async () => {
    const toolData = await factory.attrs('Tool');
    const req = await server.inject({
      method: 'post', url: '/api/v1/tools', payload: toolData, auth
    });
    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'get', url: `/api/v1/tools/${req.result.id}`, auth
    });
    expect(response.statusCode).toBe(200);

    expect(response.result.data.attributes).toMatchObject({
      title: req.result.attributes.title,
      link: req.result.attributes.link,
      description: req.result.attributes.description,
      tags: response.result.data.attributes.tags,
    });
  });

  it('should not be able to find a tool by id', async () => {
    const toolData = await factory.attrs('Tool');
    const req = await server.inject({
      method: 'post', url: '/api/v1/tools', payload: toolData, auth
    });
    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'get', url: '/api/v1/tools/g254ufyd2f45', auth
    });
    expect(response.statusCode).toBe(404);
    expect(response.result).toMatchObject({
      message: 'No data was found',
    });
  });

  it('should not be able to delete if tool does not exists', async () => {
    const toolData = await factory.attrs('Tool');
    const req = await server.inject({
      method: 'post', url: '/api/v1/tools', payload: toolData, auth
    });
    expect(req.statusCode).toBe(201);

    const response = await server.inject({
      method: 'delete', url: `/api/v1/tools/${req.result.id}`, auth
    });
    expect(response.statusCode).toBe(204);
  });

});
