import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from 'morgan';
import { join } from 'path';
import { router } from './routes/router';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// Removes prepatory warnings for Mongoose 7.
mongoose.set('strictQuery', false);

// Initialize middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use('/', router);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack);
  res.status(500).send('Something went wrong');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
