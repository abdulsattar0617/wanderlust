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
const userRoute = require("./routes/user.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./Models/user.js");
require("dotenv").config();
const MongoStore = require("connect-mongo");

app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

// serve the static files - public dir
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// session store
const store = MongoStore.create({
  mongoUrl: process.env.ATLASDB_URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in MONGO SESSION STORE", err);
});

// session options
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Session middleware
app.use(session(sessionOptions));

// Flash middleware
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport Strategy
passport.use(new LocalStrategy(User.authenticate()));

// Passport serialize and Deserialize
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash message extracter
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Listing route
app.use("/listings", listingsRoute);
// Review route
app.use("/listings/:id/reviews", reviewsRoute);

// User route
app.use("/", userRoute);

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
