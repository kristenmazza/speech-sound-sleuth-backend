import mongoose from 'mongoose';

mongoose.set('strictQuery', false);

const mongoDB = process.env.MONGODB_URI as string;

async function connectDatabase(): Promise<void> {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.createConnection(mongoDB);
  } else {
    await mongoose.connect(mongoDB);
  }
}

try {
  connectDatabase();
} catch (error) {
  console.error(error);
}
