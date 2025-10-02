const Listing = require("./models/listing");
const Review = require("./models/review");
const { listingSchema ,reviewSchema} = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req ,res ,next) => {
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error" ,"you must be logged in ");
         
        return res.redirect("/login");
    }
    next();
};


module.exports.saveRedirectUrl = (req ,res ,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
       
    }
     next();
};

module.exports.isListingOwner = async(req ,res ,next) => {
    let {id} = req.params;

    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You do not have permission to do that.");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

// NOTE: The following isOwner is for reviews and should be renamed or removed. Using isReviewAuthor instead.
module.exports.isOwner = async(req ,res ,next) => {
    let {reviewId} = req.params;

    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You do not have permission to do that.");
        return res.redirect(`/listings/${id}`);
    }

    next();
};

module.exports.isReviewAuthor = async(req ,res ,next) => {
    let {id ,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You do not have permission to do that.");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing = (req ,res ,next) => {
    let {error} = listingSchema.validate(req.body);
    if (error) {
        let msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }else {
        next();
    }
};

module.exports.validateReview = (req ,res ,next) => {
    let {error} = reviewSchema.validate(req.body);
    if (error) {
        let msg = error.details.map(el => el.message).join(",");
        throw new ExpressError(400, msg);
    }else {
        next();
    }
};
