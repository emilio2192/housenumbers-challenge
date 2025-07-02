import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Global test setup
beforeAll(async () => {
  // Connect to test database
  const testMongoUrl = process.env.MONGO_URL_TEST || 'mongodb://localhost:27017/housenumbers-test';
  await mongoose.connect(testMongoUrl);
});

// Global test teardown
afterAll(async () => {
  await mongoose.connection.close();
});

// Clean up database between tests
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});
