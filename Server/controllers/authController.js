// controllers/authController.js
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');

// Test endpoint to check if the controller is working
const test = (req, res) => {
  res.json('test is working');
};

// User registration function
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
      return res.json({ error: 'Name, email, and password are required' });
    }

    // Check if email is already taken
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.json({ error: 'Email is already taken' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await hashPassword(password);

    // Create a new user in the database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// User login function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      // If no user found, return an error response
      res.status(401).json({ success: false, message: 'No user found' });
      return;
    }

    // Compare the provided password with the hashed password in the database
    const match = await comparePassword(password, user.password);

    if (match) {
      // If passwords match, return a success response
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      // If passwords don't match, return an error response
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Admin registration function
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if name, email, and password are provided
    if (!name || !email || !password) {
      return res.json({ error: 'Name, email, and password are required' });
    }

    // Check if email is already taken
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.json({ error: 'Email is already taken' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await hashPassword(password);

    // Create a new admin user in the database
    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: true, // For admin users
    });

    return res.json(admin);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// Admin Login function
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await User.findOne({ email, isAdmin: true });

    if (!admin) {
      res.status(401).json({ success: false, message: 'No admin found' });
      return;
    }

    const match = await comparePassword(password, admin.password);

    if (match) {
      res.status(200).json({ success: true, message: 'Admin login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


// Export the functions for use in routes
module.exports = {
  test,
  registerUser,
  loginUser,
  registerAdmin,
  loginAdmin,
};
