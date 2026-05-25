const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}).select('-password');
    console.log('--- Users in Database ---');
    console.log(users);
    console.log('-------------------------');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkUsers();
