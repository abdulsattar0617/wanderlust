const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8080;
const session = require("express-session");
const path = require("path");
const app = express();
const flash = require("connect-flash");

app.use(cookieParser("secretCode"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// middleware for user authentication
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("error");
  res.locals.errorMsg = req.flash("success");

  next();
});

// Request count
app.get("/reqcount", (req, res) => {
  if (req.session.count) {
    req.session.count++;
  } else {
    req.session.count = 1;
  }

  res.send(`The you sent ${req.session.count} request to the server.`);
});

app.get("/test", (req, res) => {
  res.send("test successful!");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", (req, res) => {
  req.session.user = req.body.user;

  req.flash("success", "Welcome to X.in");

  res.redirect("/hello");
});

app.get("/account", (req, res) => {
  if (req.session.user) {
    res.send(req.session);
  } else {
    req.flash("error", "Please create a account first!");
    res.redirect("/register");
  }
});

app.get("/hello", (req, res) => {
  if (req.session.user) {
    res.render("hello.ejs", {
      user: req.session.user,
    });
  } else {
    req.flash("error", "User not registered!");

    req.session.user = {
      username: "anonymouse",
    };
  }

  res.render("hello.ejs");
});

// app.get("/savecookie/signed", (req, res) => {
//   let key = Object.keys(req.query)[0];
//   let value = Object.values(req.query)[0];

//   res.cookie(key, value, { signed: true });

//   res.send("Signed cookie saved!");
// });

// app.get("/savecookie", (req, res) => {
//   let key = Object.keys(req.query)[0];
//   let value = Object.values(req.query)[0];
//   res.cookie(key, value);

//   res.send("cookie sent!");
// });

// app.get("/clearcookie/:cookieName", (req, res) => {
//   let { cookieName } = req.params;
//   console.dir(res.cookie);
//   res.clearCookie(cookieName);
//   res.send("name cookie is removed!");
// });

// app.get("/cookie", (req, res) => {
//   console.log(req.signedCookies);
//   res.send(req.cookies);
// });

app.listen(port, () => {
  console.log(`server started at ${port}...`);
});
