import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';

dotenv.config('../.env');

const app = express();

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data


// app.get('/', (req, res, next) => {
//   const error = new Error('💥 Test error triggered');
//   error.statusCode = 500;
//   next(error); // Pass the error to the errorHandler middleware
// });

// Routes
import authRoutes from './routes/auth.routes.js';

app.use('/api/v1/auth', authRoutes);

app.use(errorHandler);


export default app;