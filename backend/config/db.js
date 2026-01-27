const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDb connected.");
  } catch (error) {
    console.log("Error connecting to database:", error.message);
  }
}

module.exports = { connectDB };
