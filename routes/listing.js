const express = require("express");

const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  // Create Listing : POST
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  )

  // Index route
  .get(wrapAsync(listingController.index));

// Create listing : GET
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));
// Delete listing : GET

router.get(
  "/:id/delete",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderDeleteForm)
);

// Edit listing : GET
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

router
  .route("/:id")
  // Show listing : GET
  .get(wrapAsync(listingController.showListing))
  // Update listing : PUT
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  // Delete listing : DELETE
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
