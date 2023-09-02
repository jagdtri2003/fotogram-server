const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');



router.post('/register', async (req, res) => {
    try {
      // Extract user data from the request body
      const { name, email, username, password, gender } = req.body;
  
      // Create a new User instance using the User model
      const newUser = new User({
        name,
        email,
        username,
        password,
        gender
      });

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email: email }).exec();

    if (existingUser) {
      // Respond with a conflict status (HTTP 409) and an error message
      return res.status(409).json({ error: 'Email already exists' });
    }

      const user = await User.findOne({ username: username }).exec();

      if(user){
        res.status(409).json({error: "Username already exists"});
      }
  
      // Save the user data to the MongoDB database
      await newUser.save();
  
      // Respond with a success message or other appropriate response
      res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      // Handle errors (e.g., validation errors, database errors)
      console.error('Error:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
  });

module.exports=router;