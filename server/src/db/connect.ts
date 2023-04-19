import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

function dbConnect() {
  const dburi = process.env.MONGO_URI as string;

  mongoose.set('strictQuery', false);

  return mongoose
    .connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log('Failed to connect to database due to ', err.message);
      process.exit(1);
    });
}

export default dbConnect;
