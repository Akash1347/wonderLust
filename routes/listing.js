const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsyc.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require('../models/listing.js');
const {isLoggedIn ,isListingOwner ,validateListing} = require("../middleware.js");
const listingcontroller = require("../controllers/listings.js");

const {storage} = require("../cloudConfig.js");
const multer = require('multer');
 
const upload = multer({storage});
router
    .route('/')
    //index route
    .get(wrapAsync(listingcontroller.index))
    // create new place
    .post(isLoggedIn ,upload.single('listing[image]') ,validateListing ,wrapAsync(listingcontroller.createListing))
     


router.get("/newplace" ,isLoggedIn ,listingcontroller.renderNewForm);
 
router
    .route('/:id')
    //show route
    .get(wrapAsync(listingcontroller.showListing))
    //update route
    .put(isLoggedIn ,isListingOwner ,upload.single('listing[image]') ,validateListing ,wrapAsync(listingcontroller.updateListing))

 
//edit route
router.get('/:id/edit' ,isLoggedIn ,isListingOwner ,wrapAsync(listingcontroller.renderEditForm)
);

//delete route
router.delete('/:id/del' ,isLoggedIn ,isListingOwner ,wrapAsync(listingcontroller.deleteListing)
);

module.exports = router;
