import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import mentorRoutes from './routes/mentors.js';
import studentRoutes from './routes/students.js';
import Student from './models/Student.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public', {
  maxAge: '1d',
  setHeaders: (res, path) => {
    if (path.endsWith('favicon.ico')) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));
// Rest of your server code...


console.log('Attempting to connect to MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);  // Exit the process if unable to connect to the database
  });

app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);

app.use((req, res, next) => {
  const allowedHeaders = ['host', 'user-agent', 'accept', 'accept-language', 'content-type'];
  Object.keys(req.headers).forEach(header => {
    if (!allowedHeaders.includes(header.toLowerCase())) {
      delete req.headers[header];
    }
  });
  next();
});


app.get('/favicon.ico', (req, res, next) => {
  req.headers = {}; // Clear all headers for this specific request
  next();
});



app.get('/', (req, res) => {
  res.send('Welcome to MentorStudent API');
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});
