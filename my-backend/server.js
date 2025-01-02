// const express = require('express');
// const connectDB = require('./db');
// const cors = require('cors');
// const productRoutes = require('./routes/productRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// require('dotenv').config();
// const path = require('path');

// const app = express();

// // Connect to database
// connectDB();

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   methods: ['GET', 'POST', 'OPTIONS'],
//   credentials: true, // Allow credentials (cookies, authorization headers)
// }));

// app.use(express.json()); // Parse JSON bodies

// // Use routes
// app.use('/api', productRoutes);
// app.use('/api', paymentRoutes);
// // Start the server
// app.use(express.static(path.join(__dirname, '../build')));

// // Route to serve index.html for all non-API requests
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build', 'index.html'));
// });


// const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
//  // Bind to all network interfaces

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });




const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();
const path = require('path');

const app = express();

// Connect to database
connectDB();

// Enable CORS with proper configuration
app.use(cors({
  origin: process.env.FRONTEND_URL, // Ensure FRONTEND_URL is set in .env
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

app.use(express.json()); // Parse JSON bodies

// Define routes for product and payment APIs
app.use('/api/products', productRoutes);  // Prefixing route for better clarity
app.use('/api/payments', paymentRoutes);  // Prefixing route for better clarity

// Serve static files from the build folder (after running `npm run build` for React)
app.use(express.static(path.join(__dirname, '../build')));

// Route to serve index.html for all non-API requests (necessary for React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Define the port and host
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // This is good for allowing connections on all interfaces (e.g., in Docker or cloud services)

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

// Global Error Handling Middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});
