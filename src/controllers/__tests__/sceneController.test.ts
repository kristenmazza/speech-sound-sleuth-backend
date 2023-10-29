import * as db from '../../setup/mongoConfigTesting';
import supertest from 'supertest';
import app from '../../app';
import { HiddenImage } from '../../models/hiddenImage';
import { Scene } from '../../models/scene';
import { Score } from '../../models/score';
import mongoose from 'mongoose';

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

describe('Scene controller', () => {
  it('should validate user guess as correct', async () => {
    // Arrange
    const hiddenImage = new HiddenImage({
      name: 'test',
      imageUrl: 'testurl.com',
      minX: 0,
      maxX: 10,
      minY: 0,
      maxY: 10,
    });
    await hiddenImage.save();

    // Act
    const response = await request
      .get(`/image/${hiddenImage._id}`)
      .query({ x: 5, y: 5 });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Correct');
  });

  it('should validate user guess as incorrect', async () => {
    // Arrange
    const hiddenImage = new HiddenImage({
      name: 'test',
      imageUrl: 'testurl.com',
      minX: 0,
      maxX: 10,
      minY: 0,
      maxY: 10,
    });
    await hiddenImage.save();

    // Act
    const response = await request
      .get(`/image/${hiddenImage._id}`)
      .query({ x: 15, y: 15 });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Incorrect');
  });

  it('should get scene details', async () => {
    // Arrange
    const sceneData = {
      title: 'busy-street',
      sound: 'r',
      imageUrl: 'testurl.com',
      hiddenImages: [
        new mongoose.Types.ObjectId('65307f43ede6531308401a6d'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6e'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a70'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6f'),
      ],
    };

    const scene = new Scene(sceneData);
    await scene.save();

    // Act
    const response = await request.get(`/busy-street/r`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.title).toBe(sceneData.title);
    expect(response.body.sound).toBe(sceneData.sound);
    expect(response.body.imageUrl).toBe(sceneData.imageUrl);
  });

  it('should post a score', async () => {
    // Arrange
    // Save scene to db
    const sceneData = {
      _id: '65307f43ede6531308401a75',
      title: 'busy-street',
      sound: 'r',
      imageUrl: 'testurl.com',
      hiddenImages: [
        new mongoose.Types.ObjectId('65307f43ede6531308401a6d'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6e'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a70'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6f'),
      ],
    };

    const scene = new Scene(sceneData);
    await scene.save();

    // Create score data
    const scoreData = {
      nickname: 'Kenji',
      timeInS: 133.33,
      sound: 'r',
      scene: scene._id,
    };

    // Act
    const response = await request
      .post(`/busy-street/r/scores`)
      .send(scoreData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      __v: 0,
      _id: expect.any(String),
      nickname: scoreData.nickname,
      sound: scoreData.sound,
      timeInS: scoreData.timeInS,
      scene: {
        __v: 0,
        _id: sceneData._id,
        hiddenImages: [
          '65307f43ede6531308401a6d',
          '65307f43ede6531308401a6e',
          '65307f43ede6531308401a70',
          '65307f43ede6531308401a6f',
        ],
        imageUrl: sceneData.imageUrl,
        sound: sceneData.sound,
        title: sceneData.title,
      },
    });
  });

  it('should get score list for specified scene', async () => {
    // Arrange
    // Save scene to db
    const sceneData = {
      _id: '65307f43ede6531308401a75',
      title: 'busy-street',
      sound: 'r',
      imageUrl: 'testurl.com',
      hiddenImages: [
        new mongoose.Types.ObjectId('65307f43ede6531308401a6d'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6e'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a70'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6f'),
      ],
    };
    const scene = new Scene(sceneData);
    await scene.save();

    // Save score to db
    const scoreData = {
      nickname: 'Kenji',
      timeInS: 133.33,
      scene: '65307f43ede6531308401a75',
      sound: 'r',
    };

    const score = new Score(scoreData);
    const sceneObjectId = new mongoose.Types.ObjectId(scoreData.scene);
    score.scene = sceneObjectId;
    await score.save();

    // Act
    const response = await request.get(`/busy-street/r/scores`);

    // Assert
    expect(response.status).toBe(200);
  });
});
