/**const mongoose = require('mongoose');

// Screenshot wale credentials ke sath Connection String
const MONGO_URI = mongodb+srv://nikitachauhan84472_db_user:ZsYYP9xAtePQKlCP@cluster0.n6igby0.mongodb.net/?appName=Cluster0

const conn = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = conn;**/

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
};

module.exports = connectDB;

