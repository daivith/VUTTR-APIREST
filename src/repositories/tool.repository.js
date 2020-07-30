const ToolModel = require('../models/tool.model');
const {
  ERR_DATA_NOT_FOUND,
} = require('../utils/errorTypes');

const checkToolFound = (toolExists) => {
  if (toolExists.length === 0) {
    throw new Error(ERR_DATA_NOT_FOUND);
  }
  return toolExists;
};

const getTag = async (tag) => {
  const toolExists = await ToolModel.find({ tags: tag });
  return (checkToolFound(toolExists));
};

const getAll = async () => {
  const toolExists = await ToolModel.find({});
  return (checkToolFound(toolExists));
};

const find = async (id) => {
  const toolExists = await ToolModel.findById(id);
  if (!toolExists) {
    throw new Error(ERR_DATA_NOT_FOUND);
  }
  return toolExists;
};

const save = async (payload) => {
  const {
    title, link, description, tags,
  } = payload;
  const tool = new ToolModel();
  tool.title = title;
  tool.link = link;
  tool.description = description;
  tool.tags = tags;

  await tool.save();

  return tool;
};

const remove = (id) => ToolModel.findOneAndDelete({ _id: id });

module.exports = {
  getTag,
  getAll,
  save,
  remove,
  find,
};
