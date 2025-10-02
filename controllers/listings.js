const Listing = require("../models/listing");  
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN; 
const geocodingClint = mbxGeocoding({accessToken : mapToken});
const ExpressError = require("../utils/ExpressError");
 
     
module.exports.index = async(req ,res) => {
    const info = await Listing.find({});
    res.render("listings/index.ejs" ,{info});
     

};


module.exports.renderNewForm = (req ,res) => {
    res.render("listings/addNewPlace.ejs");
};


module.exports.showListing = async(req ,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path : 'reviews' ,populate : {path : "author"},}).populate("owner");
    // if (!listing) {
    //     throw new ExpressError(404, "Listing not found");
    // }
    if (!listing) {
        req.flash("error", "The listing you requested does not exist.");
        return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs" ,{listing});

};

module.exports.createListing = async(req ,res) => {
    let response = await geocodingClint.forwardGeocode({
        query : req.body.listing.location + ',' + req.body.listing.country,
        limit : 1
    }).send();

    let url = req.file.path;
    let filename = req.file.filename;
    let data = req.body.listing;
    console.log(data);
    
    
    let new_data = new Listing(data);
    new_data.owner = req.user._id;
    new_data.image = {url ,filename};
    new_data.geometry = response.body.features[0].geometry;
    let co = await new_data.save();
   
    req.flash("success" , "Successfully made a new listing");
    res.redirect("/listings");
     
};

module.exports.renderEditForm = async(req ,res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }
    let downgrade_img = listing.image.url;
    downgrade_img = downgrade_img.replace('/upload' ,'/upload/w_250');
    res.render("listings/edit_place.ejs" ,{listing , downgrade_img});
};

module.exports.updateListing = async(req ,res) => {
    let {id} = req.params;
    let data = req.body.listing;

    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError(404, "Listing not found");
    }

    if (data.location && data.location !== listing.location) {
        let response = await geocodingClint.forwardGeocode({
            query: data.location + ',' + data.country,
            limit: 1
        }).send();
        data.geometry = response.body.features[0].geometry;
    }

    const listing_up = await Listing.findByIdAndUpdate(id, data, {new: true});
    if(typeof req.file !== 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
        listing_up.image = {url ,filename};
        await listing_up.save();
    }

    req.flash("success" , "Successfully updated the listing");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async(req ,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success" , "Successfully deleted the listing");
   res.redirect('/listings');

};
