import * as db from '../../setup/mongoConfigTesting';
import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe('Timer controller', () => {
  let sessionID: string;

  it('should start the timer', async () => {
    const response = await request.get('/start-timer');
    sessionID = response.body.sessionID;
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Timer started');
  });

  it('should pause the timer', async () => {
    const response = await request.get(`/pause-timer/${sessionID}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Timer paused');
  });

  it('should resume the timer', async () => {
    const response = await request.get(`/resume-timer/${sessionID}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Timer resumed');
  });

  it('should send a final time greater than 0 seconds', async () => {
    const response = await request.get(`/final-time/${sessionID}`);
    expect(response.status).toBe(200);
    expect(response.body.finalTime).toBeGreaterThan(0);
  });
});
