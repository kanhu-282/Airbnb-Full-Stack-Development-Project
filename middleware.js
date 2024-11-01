const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExppressError = require("./utils/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");

//login Authenticate
module.exports.isLoggedIn = (req,res,next)=>{
    //   console.log(req.user);// check user was login or not
    // console.log(req.path,"..",req.originaUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listings!");
       return res.redirect("/login");
    }
    next();
}; 

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// owner check
module.exports.isOwner = async(req,res,next) =>{
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals. currUser._id)){
      req.flash("error","You are not the owner of this listings  permission to edit");
       return res. redirect(`/listings/${id}`)
    }
    next();
};
//validate listings method

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExppressError(400, errMsg);
  } else {
    next();
  }
};

//validate Review Method
module.exports.validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
        if(error){
          let errMsg = error.details.map((el)=> el.message).join(",");
          throw new ExppressError(400,errMsg);
        }else{
          next();
        }
  };

   //Delete review Author
  module.exports.isReviewAuthor = async(req,res,next) =>{
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals. currUser._id)){
      req.flash("error","You are not the author of this review  permission to delete");
       return res. redirect(`/listings/${id}`)
    }
    next();
};