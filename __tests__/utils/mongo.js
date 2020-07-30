const mongoose = require('mongoose');

const connectMongoTest = async () => {
  await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}

const disconnectMongoTest = async () => await mongoose.connection.close();

const removeAllCollections = async () => {
  const collections = Object.keys(mongoose.connection.collections)
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName]
    await collection.deleteMany()
  }
}

module.exports = {
  connectMongoTest,
  disconnectMongoTest,
  removeAllCollections
};