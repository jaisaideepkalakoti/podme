// contactRoutes.js
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { sendContactMessage } = require('../controllers/contactController');

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000', // Update this to match your frontend URL
  })
);

// Routes
router.post('/send-message', sendContactMessage);

module.exports = router;
