import mongoose from 'mongoose';

let memoryServer = null;

export async function connectDb() {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI is required in production.');
    }
    // development fallback: a throwaway MongoDB that lives only while the server runs
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri('vorcove');
    console.warn('MONGODB_URI is not set: using an in-memory MongoDB. Data is lost when the server stops.');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
}

export async function disconnectDb() {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}
