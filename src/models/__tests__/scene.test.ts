import { Scene } from '../scene';
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

describe('Scene model', () => {
  it('create & save scene successfully', async () => {
    // Arrange
    const sceneData = {
      title: 'Busy Street',
      sound: 'r',
      imageUrl:
        'https://kristen-mazza-blog-images.s3.us-west-1.amazonaws.com/uploads/busystreet.png',
      hiddenImages: [
        new mongoose.Types.ObjectId('65307f43ede6531308401a6d'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6e'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a70'),
        new mongoose.Types.ObjectId('65307f43ede6531308401a6f'),
      ],
    };

    // Act
    const validScene = new Scene(sceneData);
    const savedScene = await validScene.save();

    // Assert
    expect(savedScene._id).toBeDefined();
    expect(savedScene.title).toBe(sceneData.title);
    expect(savedScene.sound).toBe(sceneData.sound);
    expect(savedScene.imageUrl).toBe(sceneData.imageUrl);
    expect(savedScene.hiddenImages[0].toString()).toBe(
      '65307f43ede6531308401a6d'
    );
  });
});
