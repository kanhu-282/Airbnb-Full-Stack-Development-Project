if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
// 1-basic code setop 
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExppressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const reviewsRouter = require("./models/reviews.js");
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/userr.js");
//4-data base connect

const dbUrl = process.env.ATLASTD_URL;
//Main function call
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//new mongo store
const store = MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24  * 3600,
});

store.on("err",()=>{
  console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  },
};



app.use(session(sessionOptions));
app.use(flash());
// use for Authentication and Authorization passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);
//err
app.all("*", (req, res, next) => {
  next(new ExppressError(404, "Page Not Found!"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "smething went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
  
});
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
