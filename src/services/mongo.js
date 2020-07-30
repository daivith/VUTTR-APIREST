require('dotenv-safe').config();
const mongoose = require('mongoose');

const HOST = process.env.MONGO_HOST;
const PORT = process.env.MONGO_PORT;
const DATABASE = process.env.MONGO_DATABASE;

const uri = `mongodb://${HOST}:${PORT}/${DATABASE}`;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

try {
  mongoose.connect(uri, options);
} catch (error) {
  console.error(error);
}

mongoose.connection.on('error', (err) => {
  console.error(err);
});

module.exports = {
  uri,
  options,
};
