// authRoutes.js
const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, loginUser, registerUser, registerAdmin, loginAdmin } = require('../controllers/authController');

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000', // Update this to match your frontend URL
  })
);

// Routes
router.get('/', test);
router.post('/register', registerUser);
router.post('/register-admin', registerAdmin);
router.post('/login', loginUser); 
router.post('/login-admin', loginAdmin);



module.exports = router;
