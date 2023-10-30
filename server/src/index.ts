import 'module-alias/register';

import express, { Application } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from '@routes/posts';

//For env File 
dotenv.config();

const API_PORT: string = process.env.PORT || '8000';
const API_HOST: string = process.env.API_HOST || 'http://localhost';
const API_URL: string = `${API_HOST}:${API_PORT}`;

const app: Application = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/posts', postRoutes);

const DATABASE_URL: string = process.env.DATABASE_URL as string;

mongoose.connect(DATABASE_URL)
  .then(() => app.listen(API_PORT, () => { console.log({ listening: `${API_URL}` }) }))
  .catch((error) => console.error({ error }));
