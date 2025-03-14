// lib/connectToDB.ts
import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL as string;
if (!MONGO_URL) {
  throw new Error('Please define MONGODB_URI in your .env.local');
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (global as any).mongoose || { conn: null, promise: null };

async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export { connectToDB };
