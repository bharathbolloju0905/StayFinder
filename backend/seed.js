const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import your models
const User = require('./models/user.model');
const Listing = require('./models/listings.model');
const Booking = require('./models/booking.model');

// Connect to MongoDB
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL);

async function seed() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});

    // Create users (with fullname and avatar)
    const password = await bcrypt.hash('password123', 10);
    const host1 = await User.create({
      fullname: 'Host One',
      email: 'host1@example.com',
      password,
      role: 'host',
      avatar: '',
    });
    const host2 = await User.create({
      fullname: 'Host Two',
      email: 'host2@example.com',
      password,
      role: 'host',
      avatar: '',
    });
    const user1 = await User.create({
      fullname: 'User One',
      email: 'user1@example.com',
      password,
      role: 'user',
      avatar: '',
    });

    // Create listings (with pricePerNight and availableDates)
    const listing1 = await Listing.create({
      title: 'Cozy Apartment',
      location: 'New York',
      pricePerNight: 120,
      description: 'A cozy apartment in the heart of NYC.',
      images: [
        'https://images.unsplash.com/photo-1664892798972-079f15663b16?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZXJuJTIwYXBhcnRtZW50fGVufDB8fDB8fHww'
      ],
      host: host1._id,
      availableDates: [
        new Date('2025-07-01'),
        new Date('2025-07-02'),
        new Date('2025-07-03'),
        new Date('2025-07-04'),
        new Date('2025-07-05'),
      ],
    });
    const listing2 = await Listing.create({
      title: 'Beach House',
      location: 'Miami',
      pricePerNight: 200,
      description: 'A beautiful house by the beach.',
      images: [
        'https://media.istockphoto.com/id/1351673196/photo/modern-living-room-interior-3d-render.webp?a=1&b=1&s=612x612&w=0&k=20&c=GXPfwVdlEkNAXDSnqkTH5w2FSC735jbiazN4scEvMi4='
      ],
      host: host2._id,
      availableDates: [
        new Date('2025-08-10'),
        new Date('2025-08-11'),
        new Date('2025-08-12'),
        new Date('2025-08-13'),
        new Date('2025-08-14'),
        new Date('2025-08-15'),
      ],
    });

    // Create bookings (with checkIn, checkOut, totalPrice)
    await Booking.create({
      user: user1._id,
      listing: listing1._id,
      checkIn: new Date('2025-07-01'),
      checkOut: new Date('2025-07-05'),
      totalPrice: 120 * 4, // 4 nights
    });

    await Booking.create({
      user: user1._id,
      listing: listing2._id,
      checkIn: new Date('2025-08-10'),
      checkOut: new Date('2025-08-15'),
      totalPrice: 200 * 5, // 5 nights
    });

    console.log('Seed data inserted successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
}

// seed();

module.exports = seed;