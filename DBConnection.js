const mongoose = require("mongoose");
require("dotenv").config(); 
const dbUrl = process.env.ATLASDB_URL; 

const connectDB = async function () {
  try {
    // console.log(dbUrl);
    let result = await mongoose.connect(dbUrl);
    // let result = await mongoose.connect(MONGO_URL);
    console.log("Database connected!");
    return true; 
  } catch (err) {
    console.log(err);
    return false; 
  }
};

// connectDB(); // test connection

module.exports = connectDB; 

