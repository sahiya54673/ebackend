const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const testDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const count = await Product.countDocuments();
    console.log(`Product count: ${count}`);
    const products = await Product.find({}).limit(5);
    console.log('Sample Products:', JSON.stringify(products, null, 2));
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

testDB();
