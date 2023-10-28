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
        '65307f43ede6531308401a6d',
        '65307f43ede6531308401a6e',
        '65307f43ede6531308401a70',
        '65307f43ede6531308401a6f',
      ],
    };

    // Act
    const validScene = new Scene(sceneData);
    const hiddenImageId0 = new mongoose.Types.ObjectId(
      sceneData.hiddenImages[0]
    );
    const hiddenImageId1 = new mongoose.Types.ObjectId(
      sceneData.hiddenImages[1]
    );
    const hiddenImageId2 = new mongoose.Types.ObjectId(
      sceneData.hiddenImages[2]
    );
    const hiddenImageId3 = new mongoose.Types.ObjectId(
      sceneData.hiddenImages[3]
    );

    validScene.hiddenImages[0] = hiddenImageId0;
    validScene.hiddenImages[1] = hiddenImageId1;
    validScene.hiddenImages[2] = hiddenImageId2;
    validScene.hiddenImages[3] = hiddenImageId3;

    const savedScene = await validScene.save();

    // Assert
    expect(savedScene._id).toBeDefined();
    expect(savedScene.title).toBe(sceneData.title);
    expect(savedScene.sound).toBe(sceneData.sound);
    expect(savedScene.imageUrl).toBe(sceneData.imageUrl);
    expect(savedScene.hiddenImages[0].toString()).toBe(
      hiddenImageId0.toString()
    );
  });
});
