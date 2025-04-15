
const dotenv = require("dotenv");


const mongoose = require('mongoose');
const connectDb = async () => {
  await mongoose.connect(
    process.env.MONGODB_URL
  );
};

export default connectDb;