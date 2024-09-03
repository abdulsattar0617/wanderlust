const connectDB = require("./DBConnection");
const express = require("express");
const port = 3000;
const app = express();
const Listing = require("./Models/listing");
const initListing = require("./init");
const path = require("path");
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method')); 


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.send("ROOT");
});

app.delete('/listings/:id', async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect('/listings');
})

app.get('/listings/:id/delete', async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/delete.ejs", { listing });
})

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

app.post("/listings", async (req, res) => {
  let newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  let listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

// Index route
app.get("/listings", async (req, res) => {
  let allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

app.listen(port, () => {
  connectDB(); // connect DB Wanderlust

  console.log(`server listening on port ${port}...`);
});
