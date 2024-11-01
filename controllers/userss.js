//Userr controller Mvc
const User = require("../models/user.js");
//Login process
module.exports.renderSignupFrom = (req, res) => {
  res.render("users/signup.ejs");
};
//signup process
module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to Wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};
//Login process
module.exports.renderLoginFrom = (req, res) => {
  res.render("users/login.ejs");
};

//post request login
module.exports.login = async (req, res) => {
  req.flash("success", "welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
//Logout function
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
