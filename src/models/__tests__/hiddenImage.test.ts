import { HiddenImage } from '../hiddenImage';
import * as db from '../../setup/mongoConfigTesting';

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

describe('hiddenImage model', () => {
  it('create & save hiddenImage successfully', async () => {
    // Arrange
    const hiddenImageData = {
      name: 'dinosaur',
      imageUrl:
        'https://kristen-mazza-blog-images.s3.us-west-1.amazonaws.com/uploads/3851d5c5-ec40-4b6a-963a-0d96d01b524b-dinosaur.png',
      minX: 91,
      maxX: 95,
      minY: 4,
      maxY: 48,
    };

    // Act
    const validhiddenImage = new HiddenImage(hiddenImageData);
    const savedHiddenImage = await validhiddenImage.save();

    // Assert
    expect(savedHiddenImage._id).toBeDefined();
    expect(savedHiddenImage.name).toBe(hiddenImageData.name);
    expect(savedHiddenImage.imageUrl).toBe(hiddenImageData.imageUrl);
    expect(savedHiddenImage.minX).toBe(hiddenImageData.minX);
  });
});
