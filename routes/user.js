const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/users");

// LOgout : GET
router.get("/logout", userController.logout);

router
  .route("/signup")

  .get(userController.renderSignupForm)

  .post(wrapAsync(userController.signup));

router
  .route("/login")

  .get(userController.renderLoginForm)

  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(userController.login)
  );

router.route("/").get((req, res) => {
  res.redirect("/listings");
});

module.exports = router;
