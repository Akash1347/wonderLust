const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.createReview = async(req ,res) => {
    let {id} = req.params;
    let data = req.body.review;
    let new_review = new Review(data);
    new_review.author = req.user._id;
    console.log(new_review);
    await new_review.save();
    let listing = await Listing.findById(id);
    
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    
    listing.reviews.push(new_review);
    await listing.save();
    req.flash("success" , "Successfully added a new review");
    res.redirect(`/listings/${id}`);

};

module.exports.destroyReview = async(req ,res) => {
    let {id ,reviewId} = req.params;
    
    let listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    
    await Listing.findByIdAndUpdate(id ,{$pull : {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Successfully deleted the review");
    res.redirect(`/listings/${id}`);
};