const express = require("express"); 
const wrapAsync = require("../utils/wrapAsync"); 
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviews");

// merge the parent route & sub route
const router = express.Router({ mergeParams: true });

// Review
// Delete review : POST
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

// Create review : POST
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

module.exports = router;