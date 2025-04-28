import mongoose from 'mongoose';
import { Error } from '../types/auth.types';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('MongoDB connected successfully');
  } catch (error: unknown) {
    console.error('MongoDB connection failed:', (error as Error).message);
    process.exit(1);
  }
};

export default connectDB;
