import router from '../../src/routes/router';
import request from 'supertest';
import express from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
const initializeMongoServer = require('../mongoConfigTesting') as any;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', router);

describe('Router tests', () => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await initializeMongoServer();
  }, 60000);

  afterAll(async () => {
    await mongod.stop();
  });

  it('should respond with "hi :)"', (done) => {
    request(app).get('/').expect('hi :)').expect(200, done);
  });

  it('should validate user guess', async () => {
    const hiddenImageId = '65307f43ede6531308401a6e';
    const response = await request(app).get(
      `/image/${hiddenImageId}?x=50&y=40`
    );
    expect(response.status).toBe(200);
    expect(response.text).toBe('{"message":"Correct"}');
  });
});
