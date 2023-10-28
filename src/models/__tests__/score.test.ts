import { Score } from '../score';
import * as db from '../../setup/mongoConfigTesting';
import mongoose from 'mongoose';

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe('Score model', () => {
  it('create & save score successfully', async () => {
    // Arrange
    const scoreData = {
      nickname: 'Kenji',
      timeInS: 133.33,
      scene: '65307f43ede6531308401a75',
      sound: 'r',
    };

    // Act
    const validScore = new Score(scoreData);
    const sceneObjectId = new mongoose.Types.ObjectId(scoreData.scene);
    validScore.scene = sceneObjectId;
    const savedScore = await validScore.save();

    // Assert
    expect(savedScore._id).toBeDefined();
    expect(savedScore.nickname).toBe(scoreData.nickname);
    expect(savedScore.timeInS).toBe(scoreData.timeInS);
    expect(savedScore.scene.toString()).toBe(sceneObjectId.toString());
    expect(savedScore.sound).toBe(scoreData.sound);
  });
});
