import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import dbConnect from './db/connect';

const PORT = (process.env.PORT as unknown as number) || 5001;
const HOST = process.env.HOST as string;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(PORT, HOST, () => {
  console.log(`App is listening at http://${HOST}:${PORT}`);

  dbConnect();
});
