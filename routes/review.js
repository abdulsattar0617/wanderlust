const express = require("express");
const Listing = require("../Models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");
const Review = require("../Models/review");

// merge the parent route & sub route
const router = express.Router({ mergeParams: true });

// validate review
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};

// Review
// Delete review : POST
router.delete(
  "/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // flash message
    // req.flash("type", "success");
    req.flash("success", "Review Deleted!");

    res.redirect(`/listings/${id}`);
  })
);

// Create review : POST
router.post(
  "/",
  validateReview,
  wrapAsync(async (req, res) => {
    console.log("In wrap async R-Post");

    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    // save
    await newReview.save();
    await listing.save();

    // flash message
    // req.flash("type", "success");
    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${req.params.id}`);
  })
);

module.exports = router;
