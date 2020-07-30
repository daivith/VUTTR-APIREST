const boom = require('@hapi/boom');
const ToolRepository = require('../repositories/tool.repository');

const {
  ERR_DATA_NOT_FOUND,
} = require('../utils/errorTypes');

const transformer = (tool) => ({
  type: 'tools',
  id: tool.id,
  attributes: {
    title: tool.title,
    link: tool.link,
    description: tool.description,
    tags: tool.tags,
  },
  links: {
    self: `/api/v1/tools/${tool.id}`,
  },
});

const switchError = (e) => {
  switch (e.message) {
    case ERR_DATA_NOT_FOUND:
      throw boom.notFound('No data was found');
    default:
      throw boom.badImplementation(e);
  }
};

const getAll = async (req) => {
  try {
    let tools = {};
    if (req.query.tag !== undefined) {
      tools = await ToolRepository.getTag(req.query.tag);
    } else {
      tools = await ToolRepository.getAll();
    }
    return { data: tools.map(transformer) };
  } catch (e) {
    switchError(e);
  }
};

const find = async (req) => {
  try {
    const tool = await ToolRepository.find(req.params.id);
    return { data: transformer(tool) };
  } catch (e) {
    switchError(e);
  }
};

const save = async (req, h) => {
  const tool = await ToolRepository.save(req.payload);

  return h.response(transformer(tool)).code(201);
};

const remove = async (req, h) => {
  await ToolRepository.remove(req.params.id);
  return h.response().code(204);
};

module.exports = {
  getAll,
  save,
  remove,
  find,
};
