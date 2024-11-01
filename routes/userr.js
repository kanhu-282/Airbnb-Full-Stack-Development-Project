const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const flash = require("connect-flash");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/userss.js");
//router.route() to avoid duplicate route naming and thus typing errors.
//signup process
router
  .route("/signup")
  .get(userController.renderSignupFrom)
  .post(wrapAsync(userController.signup));

//login process get ,pos trequest
router
  .route("/login")
  .get(userController.renderLoginFrom)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

//Logout function
router.get("/logout", userController.logout);

module.exports = router;
