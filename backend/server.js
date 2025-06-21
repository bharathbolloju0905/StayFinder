const express = require('express');

const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./DB/connect.database');
const seed = require('./seed'); 
dotenv.config();

const authenticationRoutes = require('./Routes/AuthenticationRoutes');
const listingRoutes = require('./Routes/listing.route');
const bookingRoutes = require('./Routes/booking.route');
const hostRoutes = require('./Routes/host.routes');


const PORT = process.env.PORT ;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173', 'https://stay-finder-rho.vercel.app'],
    credentials: true
}));

// Routes
app.use('/api/auth', authenticationRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/host', hostRoutes);


// Start server
connectDB()
  .then(() => {
    // seed(); // Uncomment to seed the database ONCE
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });