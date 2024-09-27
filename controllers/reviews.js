const Review = require('../Models/review'); 
const Listing = require('../Models/listing'); 

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

  // flash message
  // req.flash("type", "success");
  req.flash("success", "Review Deleted!");

  res.redirect(`/listings/${id}`);
};

module.exports.createReview = async (req, res) => {
    // console.log("In wrap async R-Post");

    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    // save
    await newReview.save();
    await listing.save();

    // flash message
    // req.flash("type", "success");
    req.flash("success", "New Review Created!");

    res.redirect(`/listings/${req.params.id}`);
  }