const mongoose = require('mongoose');
const UserModel = require('../src/models/users.model')
const userData = { name: 'TekLoon', email: 'tekloon@email.com', password: 'Facebook' };

describe('User Model Test', () => {
  
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  });
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('create & save user successfully', async () => {
    const validUser = new UserModel(userData);
    const savedUser = await validUser.save();
    // Object Id should be defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

  // Test Schema is working!!!
  // You shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully, but the field does not defined in schema should be undefined', async () => {
    const userWithInvalidField = new UserModel({ name: 'TekLoon', email: 'tekloon@email.com', nickname: 'Handsome TekLoon' });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickkname).toBeUndefined();
  });
})