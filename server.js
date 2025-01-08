const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db');  // Add DB connection module here
const authRoutes = require('./routes/authRoutes');
const kycRoutes = require('./routes/kycRoutes');
const path=require("path")
// Setup environment variables
dotenv.config();

// Create an Express application
const app = express();

// Setup CORS and body parsing
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api', authRoutes);
app.use('/api', kycRoutes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
