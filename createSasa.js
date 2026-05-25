const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createSasa = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const email = 'sasa@example.com'; // Change this if you know the actual email
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      console.log('User already exists in database');
    } else {
      await User.create({
        name: 'sasa',
        email: email,
        password: 'password123', // Default password
        isAdmin: false
      });
      console.log('User "sasa" created successfully with password: password123');
    }
    
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createSasa();
