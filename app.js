const connectDB = require("./DBConnection");
const express = require("express");
const port = process.env.port || 3000;
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const session = require("express-session");
const flash = require("connect-flash");

app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// serve the static files - public dir
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.send("ROOT");
});

app.use(
  session({
    secret: "mysupersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  })
);

// Flash middleware
app.use(flash());

// Flash message handler
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Listing route
app.use("/listings", listingsRoute);
// Review route
app.use("/listings/:id/reviews", reviewsRoute);

// 404 - response
app.get("*", (req, res, next) => {
  throw new ExpressError(404, "Page not found!");
});

// async error handler middlware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something broke!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
});

app.listen(port, () => {
  connectDB(); // connect DB Wanderlust

  console.log(`server listening on port ${port}...`);
});
