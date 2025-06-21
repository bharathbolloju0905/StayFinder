# StayFinder – Airbnb Clone (Internship Project)

StayFinder is a full-stack MERN application for listing and booking properties. Built as part of an internship assignment, it includes user authentication, property listing, detailed view, booking, and optional host dashboard.

---

## 🌐 Live Demo

- **Frontend**: [stay-finder-rho.vercel.app](https://stay-finder-rho.vercel.app/)
- **Backend API**: [stayfinder-a61m.onrender.com](https://stayfinder-a61m.onrender.com)

---

## ⚙️ Tech Stack

- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## ✨ Core Features

- 🔐 User registration/login with JWT & cookies
- 🏠 Browse property listings
- 📄 View listing details
- 📆 Booking functionality
- 👤 Host dashboard (manage listings)

---

## 🔐 Security

- JWT authentication with HttpOnly cookies
- Passwords hashed using bcrypt
- CORS with credentials between frontend & backend

---

## 📦 Sample Routes

- `GET /api/listings` – Get all listings
- `GET /api/listings/:id` – View one listing
- `POST /api/auth/login` – Login user
- `POST /api/bookings` – Create booking

---

## 🎯 Assignment Questions Answered

> **Q: What tech stack did you choose and why?**  
I used the MERN stack — MongoDB, Express.js, React, and Node.js — because it lets me build both the frontend and backend using one language: JavaScript. React is great for building fast and dynamic user interfaces, and Node.js + Express make it easy to create a REST API. MongoDB fits well with this setup since it’s flexible and easy to work with for quick development. Since this was a full-stack project, MERN was a practical and efficient choice.

> **Q: Are you comfortable building both frontend and backend if UI is provided?**  
Yes, absolutely. If a Figma or design mockup is shared, I can convert that into a working frontend using React and Tailwind CSS. On the backend, I can handle routing, database operations, authentication, and connect everything smoothly with the frontend. I’ve done all of this in this project itself — from setting up login/register to fetching and displaying listings, so I’m confident doing both sides of development

> **Q: Two unique features you'd add to improve Airbnb:**  
1. Real-time Chat: I’d add a built-in chat system where guests can message hosts directly before or after booking. This makes communication easier, avoids misunderstandings, and helps build trust.
2. AI-powered smart pricing based on demand, season, and location and personal recommendation based upon the user's past booking history.

> **Q: How would you secure and scale the app?**  
- I will use JWT tokens for login and store them in secure cookies to avoid XSS attacks.

- Passwords are hashed using bcrypt before saving to the database.

- I will set proper CORS settings so only the frontend can talk to the backend, and I validate user input to prevent bad data or security issues.

To scale it:

- I used cloud platforms like Vercel and Render to deploy the app, which can automatically handle traffic spikes.

- MongoDB Atlas can auto-scale the database if usage grows.

- If needed, the backend can be split into microservices or served behind a load balancer.

---

## 🧪 How to Run Locally

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
