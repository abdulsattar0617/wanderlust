const express = require("express");

const Listing = require("../Models/listing");

const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const router = express.Router();

// validate listing
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  } else {
    next();
  }
};

// Delete listing : DELETE
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);

    // flash message
    // req.flash("type", "success");
    req.flash("success", "Listing Deleted!");

    // console.log(deletedListing);
    res.redirect("/listings");
  })
);

// Delete listing : GET
router.get(
  "/:id/delete",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      // Flash Error
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    } else {
      res.render("listings/delete.ejs", { listing });
    }
  })
);

// Update listing : PUT
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // Flash success
    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
  })
);

// Edit listing : GET
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      // Flash Error
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    } else {
      res.render("listings/edit.ejs", { listing });
    }
  })
);

// Create Listing : POST
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    let newListing = new Listing(req.body.listing);
    await newListing.save();

    // flash message
    // req.flash("type", "success");
    req.flash("success", "New Listing Created!");

    res.redirect("/listings");
  })
);

// Create listing : GET
router.get(
  "/new",
  wrapAsync((req, res) => {
    res.render("listings/new.ejs");
  })
);

// Show listing : GET
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      // Flash Error
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    } else {
      res.render("listings/show.ejs", { listing });
    }
  })
);

// Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  })
);

module.exports = router;
