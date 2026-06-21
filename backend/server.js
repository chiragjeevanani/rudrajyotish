import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './src/config/db.js';
import Admin from './src/models/Admin.js';
import { notFound, errorHandler } from './src/middleware/errorHandler.js';

// Load routes
import authRoutes from './src/routes/auth.routes.js';
import serviceRoutes from './src/routes/service.routes.js';
import blogRoutes from './src/routes/blog.routes.js';
import testimonialRoutes from './src/routes/testimonial.routes.js';
import vastuRoutes from './src/routes/vastu.routes.js';
import bookingRoutes from './src/routes/booking.routes.js';
import contactRoutes from './src/routes/contact.routes.js';
import paymentRoutes from './src/routes/payment.routes.js';
import homeRoutes from './src/routes/home.routes.js';
import uploadRoutes from './src/routes/upload.routes.js';
import teachingRoutes from './src/routes/teaching.routes.js';
import aboutRoutes from './src/routes/about.routes.js';
import yogadhanRoutes from './src/routes/yogadhan.routes.js';
import contactInfoRoutes from './src/routes/contactInfo.routes.js';

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body parser & CORS
app.use(express.json());

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://rudramaestro.com',
  'https://www.rudramaestro.com',
];

const allowedOrigins = process.env.CLIENT_URL
  ? [...new Set([...process.env.CLIENT_URL.split(',').map(o => o.trim()), ...defaultOrigins])]
  : defaultOrigins;

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
}));

// Static folders
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Rudra Jyotish API is running...' });
});

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/vastu-tips', vastuRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/home', homeRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/teaching', teachingRoutes);
app.use('/api/v1/about', aboutRoutes);
app.use('/api/v1/yogadhan', yogadhanRoutes);
app.use('/api/v1/contact-info', contactInfoRoutes);

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

// Port and Server Boot
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  
  // Auto-seed admin user if none exists
  try {
    const adminCount = await Admin.countDocuments({});
    if (adminCount === 0) {
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || 'rudra@admin123';
      
      console.log(`No administrators found. Creating default admin with username: "${username}"`);
      await Admin.create({
        username,
        password, // Pre-save hook hashes this password!
      });
      console.log('Default administrator created successfully.');
    }
  } catch (error) {
    console.error('Error auto-seeding admin user:', error.message);
  }
});
