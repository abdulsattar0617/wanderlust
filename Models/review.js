const mongoose = require("mongoose");

// 1. create schema
const reviewSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// 2. Compile model
const Review = mongoose.model("Review", reviewSchema);

// 3. Export model
module.exports = Review;
