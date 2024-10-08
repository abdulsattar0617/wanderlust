const connectDB = require("../DBConnection");
const Listing = require("../Models/listing");
const initData = require("./data");

// console.dir(sampleListings.data);

const initializeListings = async function () {
  connectDB();

  let listingCount = (await Listing.find({})).length;

  if (!listingCount > 0) {
    await Listing.insertMany(sampleListings.data);
    console.log("Listings updated with sample listing data.");
  }
};

const initListing = async function () {
  connectDB();
  await Listing.deleteMany({});

  initData.data = initData.data.map((listing) => ({
    ...listing,
    owner: "66edb3a56e85f677f83abf55",
  }));

  await Listing.insertMany(initData.data);
  console.log("Listing data was initialized.");
};

// initializeListings();
initListing();

module.exports = initListing;
// module.exports = initializeListings;
