import mongoose from 'mongoose';

let memoryServer = null;
let pending = null;

async function open() {
  let uri = process.env.MONGODB_URI;

  if (!uri) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      throw new Error('MONGODB_URI is required in production.');
    }
    // development fallback: a throwaway MongoDB that lives only while the server runs
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri('vorcove');
    console.warn('MONGODB_URI is not set: using an in-memory MongoDB. Data is lost when the server stops.');
  }

  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 });
  console.log('MongoDB connected');
}

// connects once and reuses the connection, so serverless invocations don't reconnect on every request
export function connectDb() {
  if (!pending) pending = open().catch(err => { pending = null; throw err; });
  return pending;
}

export async function disconnectDb() {
  pending = null;
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
}
