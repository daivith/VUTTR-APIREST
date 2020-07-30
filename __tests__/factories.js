const faker = require("faker");
const { UserSchema } = require("../src/models/users.model");
const { ToolSchema } = require("../src/models/tool.model");
const mongoose = require('mongoose')

const FactoryGirl = require('factory-girl');
const factory = FactoryGirl.factory;
const adapter = new FactoryGirl.MongooseAdapter();

const User = mongoose.model('User', UserSchema);
const Tool = mongoose.model('Tool', ToolSchema);

// use the mongoose adapter as the default adapter
factory.setAdapter(adapter); 

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

factory.define('Tool', Tool, {
  title: faker.hacker.noun(),
  link: faker.internet.url(),
  description: faker.lorem.paragraph(),
  tags: [
      'node',
      'organizing',
      'webapps',
      'domain',
      'developer',
      'https',
      'proxy',
  ],
});
module.exports = factory;