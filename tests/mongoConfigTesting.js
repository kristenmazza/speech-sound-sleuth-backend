const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const testData = require('./testData');

async function initializeMongoServer() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri);

  mongoose.connection.on('error', (e) => {
    if (e.message.code === 'ETIMEDOUT') {
      console.log(e);
      mongoose.connect(mongoUri);
    }
    console.log(e);
  });

  mongoose.connection.once('open', async () => {
    console.log(`MongoDB successfully connected to ${mongoUri}`);

    await seedTestData(testData);
  });
}

async function seedTestData(data) {
  try {
    for (const modelData of testData) {
      const { model, documents } = modelData;

      const Model = mongoose.model(model);
      await Model.insertMany(documents);
    }

    console.log('Test data seeded successfully');
  } catch (error) {
    console.error('Error seeding test data: ', error);
  } finally {
    mongoose.connection.close();
  }
}

module.exports = initializeMongoServer;
