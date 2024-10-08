const Listing = require("../Models/listing");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);

  // flash message
  // req.flash("type", "success");
  req.flash("success", "Listing Deleted!");

  // console.log(deletedListing);
  res.redirect("/listings");
};

module.exports.renderDeleteForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    // Flash Error
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  } else {
    res.render("listings/delete.ejs", { listing });
  }
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { url, filename };

    await listing.save();
  }

  // Flash success
  req.flash("success", "Listing Updated!");

  res.redirect(`/listings/${id}`);
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  let originalImageUrl = listing.image.url.replace(
    "/upload",
    "/upload/w_250"
  );

  if (!listing) {
    // Flash Error
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  } else {
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  }
};

module.exports.createListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let newListing = new Listing(req.body.listing);

  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  await newListing.save();

  // flash message
  // req.flash("type", "success");
  req.flash("success", "New Listing Created!");

  res.redirect("/listings");
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  const listing = await Listing.findById(id)
    .populate("owner")
    // nesting populates
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    });

  // console.log(listing);
  if (!listing) {
    // Flash Error
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  } else {
    res.render("listings/show.ejs", { listing });
  }
};
