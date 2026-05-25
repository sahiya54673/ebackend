const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // On Vercel, we don't want to process.exit(1) as it causes a vague 500 error.
    // Instead, we throw the error so Vercel logs the specific reason.
    throw error;
  }
};

module.exports = connectDB;
