const testData = [
  {
    model: 'HiddenImage',
    documents: [
      {
        _id: '65307f43ede6531308401a6d',
        name: 'dinosaur',
        imageUrl:
          'https://kristen-mazza-blog-images.s3.us-west-1.amazonaws.com/uploads/3851d5c5-ec40-4b6a-963a-0d96d01b524b-dinosaur.png',
        minX: 91,
        maxX: 95,
        minY: 4,
        maxY: 48,
      },
      {
        _id: '65307f43ede6531308401a6e',
        name: 'fire',
        imageUrl:
          'https://kristen-mazza-blog-images.s3.us-west-1.amazonaws.com/uploads/0e96f3ab-9d91-453a-83ca-5ac779ea8acf-fire.png',
        minX: 46,
        maxX: 53,
        minY: 35,
        maxY: 42,
      },
      {
        _id: '65307f43ede6531308401a6f',
        name: 'rabbit',
        imageUrl:
          'https://kristen-mazza-blog-images.s3.us-west-1.amazonaws.com/uploads/de219517-1081-4dc3-8d83-a993b71b4110-rabbit.png',
        minX: 87.2,
        maxX: 90.2,
        minY: 91.3,
        maxY: 96,
      },
      {
        _id: '65307f43ede6531308401a70',
        name: 'harp',
        imageUrl:
          'https://kristen-mazza-blog-images.s3.us-west-1.amazonaws.com/uploads/ad3a44dd-f402-4e4e-8703-a73bb549895f-harp.png',
        minX: 40,
        maxX: 44.5,
        minY: 82,
        maxY: 91,
      },
    ],
  },
  {
    model: 'Scene',
    documents: [
      {
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
      },
    ],
  },
  {
    model: 'Score',
    documents: [
      {
        nickname: 'Suzy',
        timeInS: 129,
        sound: 'r',
        scene: '65307f43ede6531308401a75',
      },
      {
        nickname: 'Bre',
        timeInS: 151,
        sound: 'r',
        scene: '65307f43ede6531308401a75',
      },
    ],
  },
];

module.exports = testData;
