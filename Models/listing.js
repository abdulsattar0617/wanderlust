const { ref } = require("joi");
const mongoose = require("mongoose");
const Review = require("./review");

const DEFAULT_IMAMGE_URL =
  "https://images.unsplash.com/photo-1490197415175-074fd86b1fcc?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// 1. create schema
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  image: {
    type: String,
    default: DEFAULT_IMAMGE_URL,
    set: (v) => (v === "" ? DEFAULT_IMAMGE_URL : v),
  },
  price: {
    type: Number,
    min: 1,
    required: true,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Delete review: post middle
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// 2. Compile model
const Listing = mongoose.model("listing", listingSchema);

// 3. export listing
module.exports = Listing;
