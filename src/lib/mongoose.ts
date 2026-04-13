import mongoose from 'mongoose';
import { augmentMongoUri } from '@/lib/mongo-url';

const baseUri =
  process.env.MONGODB_URL || process.env.DATABASE_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/kashishlife';
const MONGODB_URI = augmentMongoUri(baseUri);

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      return mongoose;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
