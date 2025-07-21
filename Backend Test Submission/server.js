import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import urlRoutes from './routes/urlRoutes.js';
import { loggingMiddleware } from './middleware/loggingMiddleware.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(loggingMiddleware);
app.use(urlRoutes);
app.use(errorHandler);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running at ${process.env.BASE_URL}`)
    );
  })
  .catch(err => console.error('MongoDB connection error:', err));
